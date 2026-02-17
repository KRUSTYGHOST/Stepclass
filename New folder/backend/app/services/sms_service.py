import os
from twilio.rest import Client
from typing import List
from dotenv import load_dotenv

load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

class SMSService:
    def __init__(self):
        self.client = None
        if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
            try:
                self.client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
            except Exception as e:
                print(f"Twilio initialization error: {e}")
    
    def send_sms(self, to_phone: str, message: str):
        """Send SMS using Twilio"""
        if self.client and TWILIO_PHONE_NUMBER:
            try:
                message = self.client.messages.create(
                    body=message,
                    from_=TWILIO_PHONE_NUMBER,
                    to=to_phone
                )
                return message.sid is not None
            except Exception as e:
                print(f"Twilio SMS error: {e}")
                return False
        else:
            # Fallback: Print SMS (for development)
            print(f"\n=== SMS (Mock) ===")
            print(f"To: {to_phone}")
            print(f"Message: {message}")
            print("================\n")
            return True
    
    def send_bulk_sms(self, phone_numbers: List[str], message: str):
        """Send SMS to multiple recipients"""
        success_count = 0
        for phone in phone_numbers:
            if self.send_sms(phone, message):
                success_count += 1
        return success_count

sms_service = SMSService()
