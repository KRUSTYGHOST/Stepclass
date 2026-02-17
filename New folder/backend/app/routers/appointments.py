from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from app.database import get_db
from app.models import Appointment, User
from app.schemas import AppointmentCreate, AppointmentResponse
from app.auth import get_current_user
from app.services.email_service import email_service

router = APIRouter()

@router.post("/", response_model=AppointmentResponse)
def create_appointment(
    appointment_data: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify doctor exists and is a doctor
    doctor = db.query(User).filter(
        User.id == appointment_data.doctor_id,
        User.role == "doctor"
    ).first()
    
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    
    # Check if appointment time is in the future
    if appointment_data.appointment_date <= datetime.now():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Appointment date must be in the future"
        )
    
    # Check for conflicting appointments (same doctor, overlapping time)
    existing_appointments = db.query(Appointment).filter(
        Appointment.doctor_id == appointment_data.doctor_id,
        Appointment.status == "scheduled",
        Appointment.appointment_date >= appointment_data.appointment_date - timedelta(minutes=appointment_data.duration_minutes),
        Appointment.appointment_date <= appointment_data.appointment_date + timedelta(minutes=appointment_data.duration_minutes)
    ).first()
    
    if existing_appointments:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Doctor is not available at this time"
        )
    
    # Create appointment
    appointment = Appointment(
        student_id=current_user.id,
        doctor_id=appointment_data.doctor_id,
        appointment_date=appointment_data.appointment_date,
        duration_minutes=appointment_data.duration_minutes,
        reason=appointment_data.reason,
        status="scheduled"
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    
    # Send confirmation email
    email_subject = f"Appointment Confirmed - {doctor.full_name}"
    email_html = f"""
    <html>
    <body>
        <h2>Appointment Confirmed</h2>
        <p>Dear {current_user.full_name},</p>
        <p>Your appointment has been confirmed:</p>
        <ul>
            <li><strong>Doctor:</strong> {doctor.full_name}</li>
            <li><strong>Date & Time:</strong> {appointment_data.appointment_date.strftime('%Y-%m-%d %H:%M')}</li>
            <li><strong>Duration:</strong> {appointment_data.duration_minutes} minutes</li>
            <li><strong>Reason:</strong> {appointment_data.reason or 'Not specified'}</li>
        </ul>
        <p>Thank you for using MediConnect!</p>
    </body>
    </html>
    """
    email_service.send_email(current_user.email, email_subject, email_html)
    
    return appointment

@router.get("/", response_model=List[AppointmentResponse])
def get_appointments(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50
):
    from sqlalchemy.orm import joinedload
    
    if current_user.role == "doctor":
        appointments = db.query(Appointment).options(
            joinedload(Appointment.student)
        ).filter(
            Appointment.doctor_id == current_user.id
        ).order_by(Appointment.appointment_date).offset(skip).limit(limit).all()
    else:
        appointments = db.query(Appointment).options(
            joinedload(Appointment.doctor)
        ).filter(
            Appointment.student_id == current_user.id
        ).order_by(Appointment.appointment_date).offset(skip).limit(limit).all()
    
    # Convert to response format with doctor/student info
    result = []
    for apt in appointments:
        apt_dict = {
            "id": apt.id,
            "student_id": apt.student_id,
            "doctor_id": apt.doctor_id,
            "appointment_date": apt.appointment_date,
            "duration_minutes": apt.duration_minutes,
            "reason": apt.reason,
            "status": apt.status,
            "created_at": apt.created_at,
            "doctor": apt.doctor if hasattr(apt, 'doctor') and apt.doctor else None
        }
        result.append(apt_dict)
    
    return result

@router.get("/available-slots")
def get_available_slots(
    doctor_id: int,
    date: str,  # YYYY-MM-DD format
    db: Session = Depends(get_db)
):
    """Get available time slots for a doctor on a specific date"""
    doctor = db.query(User).filter(
        User.id == doctor_id,
        User.role == "doctor"
    ).first()
    
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    # Parse date
    try:
        target_date = datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Get booked appointments for that day
    start_of_day = target_date.replace(hour=9, minute=0, second=0, microsecond=0)
    end_of_day = target_date.replace(hour=17, minute=0, second=0, microsecond=0)
    
    booked_appointments = db.query(Appointment).filter(
        Appointment.doctor_id == doctor_id,
        Appointment.status == "scheduled",
        Appointment.appointment_date >= start_of_day,
        Appointment.appointment_date < end_of_day
    ).all()
    
    booked_times = {apt.appointment_date for apt in booked_appointments}
    
    # Generate available slots (every 30 minutes from 9 AM to 5 PM)
    available_slots = []
    current_time = start_of_day
    
    while current_time < end_of_day:
        if current_time not in booked_times:
            available_slots.append(current_time.isoformat())
        current_time += timedelta(minutes=30)
    
    return {
        "doctor_id": doctor_id,
        "doctor_name": doctor.full_name,
        "date": date,
        "available_slots": available_slots
    }

@router.patch("/{appointment_id}/cancel")
def cancel_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Check if user has permission
    if appointment.student_id != current_user.id and appointment.doctor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this appointment")
    
    if appointment.status != "scheduled":
        raise HTTPException(status_code=400, detail="Appointment cannot be cancelled")
    
    appointment.status = "cancelled"
    db.commit()
    
    return {"message": "Appointment cancelled successfully"}
