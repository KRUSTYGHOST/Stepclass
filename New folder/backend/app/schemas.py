from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models import UserRole, BloodGroup

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.STUDENT
    blood_group: Optional[BloodGroup] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Emergency Contact Schemas
class EmergencyContactBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    relationship: Optional[str] = None
    is_primary: bool = False

class EmergencyContactCreate(EmergencyContactBase):
    pass

class EmergencyContactResponse(EmergencyContactBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Appointment Schemas
class AppointmentBase(BaseModel):
    doctor_id: int
    appointment_date: datetime
    duration_minutes: int = 30
    reason: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: int
    student_id: int
    status: str
    created_at: datetime
    doctor: Optional[UserResponse] = None
    
    class Config:
        from_attributes = True

# Disease Prediction Schemas
class PredictionResponse(BaseModel):
    predicted_disease: str
    confidence: float
    recommendation: str
    image_url: str

# SOS Schemas
class SOSRequest(BaseModel):
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    location_address: Optional[str] = None
    message: Optional[str] = None

class SOSResponse(BaseModel):
    success: bool
    message: str
    contacts_notified: int

# Mailer Schemas
class BloodDonationRequest(BaseModel):
    subject: str
    message: str
    blood_group: Optional[BloodGroup] = None  # None means all blood groups

class MailerResponse(BaseModel):
    success: bool
    emails_sent: int
    message: str
