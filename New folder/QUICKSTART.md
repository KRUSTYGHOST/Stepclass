# MediConnect Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Using Docker (Easiest)

```bash
# 1. Copy environment file
cp backend/.env.example backend/.env

# 2. Start all services
docker-compose up --build

# 3. Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/docs
```

### Manual Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python run.py
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Demo Flow

1. **Register Users**
   - Go to http://localhost:3000/register
   - Create a student account
   - Create a doctor account (role: doctor)

2. **Test Disease Detection**
   - Login as student
   - Go to "Disease Detection"
   - Upload any image
   - See prediction results

3. **Add Emergency Contacts**
   - Go to "Emergency Contacts"
   - Add at least one contact
   - Include phone and email

4. **Test SOS**
   - Click the red SOS button (bottom right)
   - Fill in emergency message
   - Check console/email for notifications

5. **Book Appointment**
   - Go to "Appointments"
   - Select a doctor
   - Choose date and time slot
   - Book appointment

6. **Test Mailer (Admin)**
   - Register/login as admin (role: admin)
   - Go to "Admin" → Mailer
   - Send bulk blood donation email

## 📝 Notes

- **Mock Mode**: Email/SMS work without API keys (prints to console)
- **Database**: Uses SQLite by default (no setup needed)
- **ML Model**: Uses mock predictions (ready for real model integration)

## 🔧 Troubleshooting

- **Port 3000/8000 in use?** Change ports in config files
- **CORS errors?** Check backend CORS settings in `main.py`
- **Database errors?** Delete `backend/mediconnect.db` and restart

## 🎯 Hackathon Demo Checklist

- ✅ User registration/login
- ✅ Disease detection with image upload
- ✅ SOS button functionality
- ✅ Appointment booking
- ✅ Admin mailer
- ✅ Responsive UI
- ✅ API documentation at /docs

---

**Ready to demo!** 🎉
