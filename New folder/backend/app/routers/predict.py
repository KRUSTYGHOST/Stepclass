from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
import uuid
from datetime import datetime
from app.database import get_db
from app.models import DiseasePrediction, User
from app.schemas import PredictionResponse
from app.auth import get_current_user
from app.ml_model import classifier

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.post("/", response_model=PredictionResponse)
async def predict_disease(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Save uploaded file
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    try:
        # Get prediction from ML model
        prediction_result = classifier.predict(file_path)
        
        # Save prediction to database
        db_prediction = DiseasePrediction(
            user_id=current_user.id,
            image_path=file_path,
            predicted_disease=prediction_result["predicted_disease"],
            confidence=prediction_result["confidence"],
            recommendation=prediction_result["recommendation"]
        )
        db.add(db_prediction)
        db.commit()
        
        # Return response with image URL
        image_url = f"/uploads/{unique_filename}"
        
        return PredictionResponse(
            predicted_disease=prediction_result["predicted_disease"],
            confidence=prediction_result["confidence"],
            recommendation=prediction_result["recommendation"],
            image_url=image_url
        )
    except Exception as e:
        # Clean up file on error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@router.get("/history")
def get_prediction_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    predictions = db.query(DiseasePrediction).filter(
        DiseasePrediction.user_id == current_user.id
    ).order_by(DiseasePrediction.created_at.desc()).offset(skip).limit(limit).all()
    
    return [
        {
            "id": p.id,
            "predicted_disease": p.predicted_disease,
            "confidence": p.confidence,
            "recommendation": p.recommendation,
            "image_url": f"/uploads/{os.path.basename(p.image_path)}",
            "created_at": p.created_at
        }
        for p in predictions
    ]
