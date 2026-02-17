# MediConnect - Full-Stack Healthcare Platform

A comprehensive healthcare web application with AI-powered disease detection, SOS emergency alerts, appointment booking, and blood donation management.

## 🚀 Features

### 1. **AI Disease Detection**
- Upload images (skin, eye conditions, etc.)
- ML model classifies conditions (acne, eczema, conjunctivitis, etc.)
- Returns predictions with confidence scores and recommendations

### 2. **SOS Emergency System**
- One-tap SOS button
- Sends SMS and email to emergency contacts
- Includes GPS location data
- Secure contact management

### 3. **Doctor Appointment Booking**
- Calendar-based booking system
- View available time slots
- Book appointments with doctors
- Email confirmations

### 4. **Mass Blood Donation Mailer**
- Admin-only feature
- Send bulk emails to all students
- Filter by blood group
- Track email statistics

## 🏗️ Architecture

- **Frontend**: React + Vite (Node.js)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (or SQLite for development)
- **ML**: TensorFlow/Keras (mock model included, ready for real models)
- **Email**: SendGrid API
- **SMS**: Twilio API
- **Deployment**: Docker Compose

## 📁 Project Structure

```
mediconnect/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app
│   │   ├── database.py          # DB connection
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── auth.py              # Authentication
│   │   ├── ml_model.py          # Disease detection model
│   │   ├── routers/             # API routes
│   │   │   ├── auth.py
│   │   │   ├── predict.py
│   │   │   ├── sos.py
│   │   │   ├── appointments.py
│   │   │   ├── mailer.py
│   │   │   └── users.py
│   │   └── services/            # External services
│   │       ├── email_service.py
│   │       └── sms_service.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── utils/               # Utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

### Option 1: Docker (Recommended)

1. **Clone and navigate to project**
   ```bash
   cd mediconnect
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your API keys
   ```

3. **Start services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations** (if using Alembic)
   ```bash
   alembic upgrade head
   ```

6. **Start server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access frontend**
   - Open http://localhost:3000

## 🔑 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=sqlite:///./mediconnect.db
# Or PostgreSQL: postgresql://user:password@localhost/mediconnect

# Security
SECRET_KEY=your-secret-key-here

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@mediconnect.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Disease Detection
- `POST /api/predict/` - Upload image for disease prediction
- `GET /api/predict/history` - Get prediction history

### SOS Emergency
- `POST /api/sos/` - Trigger SOS alert
- `GET /api/sos/history` - Get SOS history

### Appointments
- `POST /api/appointments/` - Book appointment
- `GET /api/appointments/` - List appointments
- `GET /api/appointments/available-slots` - Get available slots
- `PATCH /api/appointments/{id}/cancel` - Cancel appointment

### Mailer (Admin)
- `POST /api/mailer/blood-donation` - Send bulk email
- `GET /api/mailer/stats` - Get mailer statistics

### Users
- `GET /api/users/` - List users
- `GET /api/users/doctors` - List doctors

## 🧪 Testing the Application

### 1. Register a User
- Go to http://localhost:3000/register
- Create a student account
- Create a doctor account (for testing appointments)

### 2. Test Disease Detection
- Login and go to Disease Detection
- Upload an image (skin, eye, etc.)
- View prediction results

### 3. Test SOS
- Add emergency contacts
- Click the SOS button
- Check email/SMS (or console for mock mode)

### 4. Test Appointments
- Login as student
- Go to Appointments
- Select a doctor and book a slot

### 5. Test Mailer (Admin)
- Register/login as admin
- Go to Admin Mailer
- Send bulk blood donation emails

## 🤖 ML Model Integration

The current implementation uses a mock classifier. To integrate a real model:

1. **Train your model** (TensorFlow/Keras)
2. **Save the model** (e.g., `model.h5`)
3. **Update `backend/app/ml_model.py`**:
   ```python
   def load_model(self):
       self.model = tf.keras.models.load_model('path/to/model.h5')
   ```

## 🚢 Deployment

### AWS/GCP/Azure

1. **Backend**: Deploy FastAPI using:
   - AWS Elastic Beanstalk
   - Google Cloud Run
   - Azure App Service

2. **Frontend**: Deploy React using:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps

3. **Database**: Use managed PostgreSQL:
   - AWS RDS
   - Google Cloud SQL
   - Azure Database

## 📝 Notes

- **Mock Services**: Email and SMS services work in mock mode without API keys (prints to console)
- **Database**: Uses SQLite by default for development. Switch to PostgreSQL for production
- **ML Model**: Currently uses mock predictions. Replace with trained model for real predictions
- **Security**: Change `SECRET_KEY` in production
- **CORS**: Configure allowed origins in `backend/app/main.py`

## 🐛 Troubleshooting

- **Port conflicts**: Change ports in `docker-compose.yml` or config files
- **Database errors**: Ensure database is running and credentials are correct
- **CORS errors**: Check backend CORS settings
- **ML errors**: Ensure TensorFlow is installed correctly

## 📄 License

This project is open source and available for hackathon/demo purposes.

## 👥 Contributing

This is a hackathon project. Feel free to extend and improve!

---

**Built for Hackathon Demo** 🚀
