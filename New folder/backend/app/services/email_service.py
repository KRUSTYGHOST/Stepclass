import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from typing import List
from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@mediconnect.com")

class EmailService:
    def __init__(self):
        self.sg = None
        if SENDGRID_API_KEY:
            self.sg = SendGridAPIClient(SENDGRID_API_KEY)
    
    def send_email(self, to_email: str, subject: str, html_content: str):
        """Send email using SendGrid or SMTP fallback"""
        if self.sg:
            try:
                message = Mail(
                    from_email=FROM_EMAIL,
                    to_emails=to_email,
                    subject=subject,
                    html_content=html_content
                )
                response = self.sg.send(message)
                return response.status_code == 202
            except Exception as e:
                print(f"SendGrid error: {e}")
                return False
        else:
            # Fallback: Print email (for development)
            print(f"\n=== EMAIL (Mock) ===")
            print(f"To: {to_email}")
            print(f"Subject: {subject}")
            print(f"Content: {html_content}")
            print("==================\n")
            return True
    
    def send_bulk_emails(self, emails: List[str], subject: str, html_content: str):
        """Send emails to multiple recipients"""
        success_count = 0
        for email in emails:
            if self.send_email(email, subject, html_content):
                success_count += 1
        return success_count

email_service = EmailService()
