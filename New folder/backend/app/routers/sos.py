from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import SOSAlert, EmergencyContact, User
from app.schemas import SOSRequest, SOSResponse
from app.auth import get_current_user
from app.services.email_service import email_service
from app.services.sms_service import sms_service

router = APIRouter()

@router.post("/", response_model=SOSResponse)
def trigger_sos(
    sos_data: SOSRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get user's emergency contacts
    contacts = db.query(EmergencyContact).filter(
        EmergencyContact.user_id == current_user.id
    ).all()
    
    if not contacts:
        raise HTTPException(
            status_code=400,
            detail="No emergency contacts found. Please add emergency contacts first."
        )
    
    # Create location message
    location_info = ""
    if sos_data.latitude and sos_data.longitude:
        location_info = f"Location: {sos_data.latitude}, {sos_data.longitude}\n"
    if sos_data.location_address:
        location_info += f"Address: {sos_data.location_address}\n"
    
    # Create SOS message
    message = f"""
🚨 SOS ALERT from {current_user.full_name} 🚨

{sos_data.message or 'Emergency assistance needed!'}

{location_info}
Phone: {current_user.phone or 'Not provided'}
Email: {current_user.email}

Please respond immediately!
    """.strip()
    
    # Send notifications
    emails_sent = 0
    sms_sent = 0
    
    for contact in contacts:
        # Send SMS
        if contact.phone:
            if sms_service.send_sms(contact.phone, message):
                sms_sent += 1
        
        # Send Email
        if contact.email:
            email_subject = f"🚨 SOS Alert from {current_user.full_name}"
            email_html = f"""
            <html>
            <body>
                <h2>🚨 Emergency SOS Alert</h2>
                <p><strong>From:</strong> {current_user.full_name}</p>
                <p><strong>Message:</strong> {sos_data.message or 'Emergency assistance needed!'}</p>
                <p><strong>Location:</strong> {location_info or 'Not provided'}</p>
                <p><strong>Contact:</strong> {current_user.phone or 'Not provided'}</p>
                <p><strong>Email:</strong> {current_user.email}</p>
                <p style="color: red;"><strong>Please respond immediately!</strong></p>
            </body>
            </html>
            """
            if email_service.send_email(contact.email, email_subject, email_html):
                emails_sent += 1
    
    # Save SOS alert to database
    sos_alert = SOSAlert(
        user_id=current_user.id,
        latitude=sos_data.latitude,
        longitude=sos_data.longitude,
        location_address=sos_data.location_address,
        message=sos_data.message,
        contacts_notified=len(contacts)
    )
    db.add(sos_alert)
    db.commit()
    
    return SOSResponse(
        success=True,
        message=f"SOS alert sent to {len(contacts)} contact(s). {sms_sent} SMS and {emails_sent} emails sent.",
        contacts_notified=len(contacts)
    )

@router.get("/history")
def get_sos_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    alerts = db.query(SOSAlert).filter(
        SOSAlert.user_id == current_user.id
    ).order_by(SOSAlert.sent_at.desc()).offset(skip).limit(limit).all()
    
    return alerts
