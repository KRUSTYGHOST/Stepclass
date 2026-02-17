"""
Disease Detection ML Model
This is a simplified model loader. In production, you would load a pre-trained model.
For demo purposes, we'll use a mock classifier that simulates predictions.
"""
import numpy as np
from PIL import Image
import tensorflow as tf
TENSORFLOW_AVAILABLE = True
import os

# Disease classes for skin conditions
DISEASE_CLASSES = {
    0: "Acne",
    1: "Eczema",
    2: "Psoriasis",
    3: "Rash",
    4: "Normal",
    5: "Conjunctivitis",
    6: "Stye"
}

RECOMMENDATIONS = {
    "Acne": "Consider using gentle cleansers and non-comedogenic products. Consult a dermatologist if persistent.",
    "Eczema": "Use moisturizers regularly and avoid triggers. See a dermatologist for proper treatment.",
    "Psoriasis": "This condition may require medical treatment. Please consult a dermatologist.",
    "Rash": "Avoid irritants and keep the area clean. If severe or spreading, see a doctor immediately.",
    "Normal": "No concerning conditions detected. Continue regular skincare routine.",
    "Conjunctivitis": "This may be contagious. See an eye doctor immediately and avoid touching your eyes.",
    "Stye": "Apply warm compresses. If it doesn't improve in a few days, consult an eye doctor."
}

class DiseaseClassifier:
    def __init__(self):
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load pre-trained model. For demo, we'll use a mock."""
        # In production, load your actual trained model:
        # self.model = tf.keras.models.load_model('path/to/model.h5')
        self.model = None  # Mock model for demo
    
    def preprocess_image(self, image_path: str):
        """Preprocess image for model input"""
        img = Image.open(image_path)
        img = img.convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    
    def predict(self, image_path: str):
        """
        Predict disease from image.
        For demo purposes, returns mock predictions.
        In production, use actual model inference.
        """
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image_path)
            
            # Mock prediction (replace with actual model prediction)
            if self.model is None:
                # Demo: Random prediction with some logic based on image
                predicted_class = np.random.randint(0, len(DISEASE_CLASSES))
                confidence = np.random.uniform(0.65, 0.95)
            else:
                # Actual model prediction
                predictions = self.model.predict(processed_image)
                predicted_class = np.argmax(predictions[0])
                confidence = float(predictions[0][predicted_class])
            
            disease_name = DISEASE_CLASSES.get(predicted_class, "Unknown")
            recommendation = RECOMMENDATIONS.get(disease_name, "Please consult a healthcare professional.")
            
            return {
                "predicted_disease": disease_name,
                "confidence": round(confidence, 2),
                "recommendation": recommendation
            }
        except Exception as e:
            return {
                "predicted_disease": "Error",
                "confidence": 0.0,
                "recommendation": f"Error processing image: {str(e)}"
            }

# Global classifier instance
classifier = DiseaseClassifier()
