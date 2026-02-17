from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, BloodGroup
from app.schemas import BloodDonationRequest, MailerResponse
from app.auth import get_current_admin_user
from app.services.email_service import email_service

router = APIRouter()

@router.post("/blood-donation", response_model=MailerResponse)
def send_blood_donation_email(
    request: BloodDonationRequest,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    # Get all students or filter by blood group
    query = db.query(User).filter(
        User.role == "student",
        User.is_active == True
    )
    
    if request.blood_group:
        query = query.filter(User.blood_group == request.blood_group)
    
    students = query.all()
    
    if not students:
        return MailerResponse(
            success=False,
            emails_sent=0,
            message="No students found matching the criteria"
        )
    
    # Prepare email content
    email_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #e74c3c; border-radius: 10px;">
            <h1 style="color: #e74c3c; text-align: center;">🩸 URGENT: Blood Donation Needed 🩸</h1>
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; font-size: 18px; font-weight: bold;">{request.message}</p>
            </div>
            <p>Dear {request.blood_group or 'Valued'} Donor,</p>
            <p>We urgently need blood donations. Your help can save lives!</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3>How to Donate:</h3>
                <ul>
                    <li>Visit the nearest blood donation center</li>
                    <li>Bring a valid ID</li>
                    <li>Ensure you meet the eligibility criteria</li>
                    <li>Contact us for more information</li>
                </ul>
            </div>
            <p style="text-align: center; margin-top: 30px;">
                <strong>Every donation counts. Thank you for your generosity!</strong>
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="text-align: center; color: #666; font-size: 12px;">
                This is an automated message from MediConnect<br>
                Please do not reply to this email
            </p>
        </div>
    </body>
    </html>
    """
    
    # Collect email addresses
    email_addresses = [student.email for student in students if student.email]
    
    # Send bulk emails
    emails_sent = email_service.send_bulk_emails(
        email_addresses,
        request.subject,
        email_html
    )
    
    return MailerResponse(
        success=True,
        emails_sent=emails_sent,
        message=f"Blood donation email sent to {emails_sent} student(s)"
    )

@router.get("/stats")
def get_mailer_stats(
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get statistics about students for mailer"""
    total_students = db.query(User).filter(
        User.role == "student",
        User.is_active == True
    ).count()
    
    students_by_blood_group = {}
    for bg in BloodGroup:
        count = db.query(User).filter(
            User.role == "student",
            User.is_active == True,
            User.blood_group == bg
        ).count()
        if count > 0:
            students_by_blood_group[bg.value] = count
    
    return {
        "total_students": total_students,
        "students_by_blood_group": students_by_blood_group
    }
