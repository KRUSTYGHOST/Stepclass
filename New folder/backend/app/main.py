from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.routers import predict, sos, appointments, mailer, auth, users, emergency_contacts
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediConnect API",
    description="Healthcare platform with disease detection, SOS, appointments, and blood donation",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(emergency_contacts.router, prefix="/api/emergency-contacts", tags=["Emergency Contacts"])
app.include_router(predict.router, prefix="/api/predict", tags=["Disease Detection"])
app.include_router(sos.router, prefix="/api/sos", tags=["SOS Emergency"])
app.include_router(appointments.router, prefix="/api/appointments", tags=["Appointments"])
app.include_router(mailer.router, prefix="/api/mailer", tags=["Blood Donation Mailer"])

# Create uploads directory
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
async def root():
    return {"message": "MediConnect API is running", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
