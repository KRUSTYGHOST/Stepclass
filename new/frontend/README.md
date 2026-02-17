# MediConnect Frontend

A modern, attractive healthcare web application built with React, Node.js, and Tailwind CSS.

## Features

### 1. **AI Health Diagnostics**
- Upload or capture images (skin, eyes, etc.)
- ML-powered disease detection and prediction
- Confidence scores and recommendations
- Camera integration for photo capture

### 2. **Emergency SOS**
- One-tap emergency alert system
- Automatic GPS location sharing
- SMS/Email notifications to emergency contacts
- Contact management system

### 3. **Doctor Appointments**
- Browse verified doctors by specialty
- Interactive calendar date selection
- Time slot booking
- Patient details form with appointment confirmation
- Email confirmations

### 4. **Blood Donation Drive**
- Admin dashboard for blood donation alerts
- Filter donors by blood group
- Bulk email notifications
- Campaign statistics and tracking

### 5. **User Authentication**
- Sign up / Log in pages
- Password validation
- Terms & conditions agreement
- Demo credentials for testing

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Express.js (Node.js)
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── HealthCheck.jsx       # AI diagnostics
│   │   ├── Emergency.jsx         # SOS feature
│   │   ├── Appointments.jsx      # Doctor booking
│   │   ├── BloodDonation.jsx     # Blood drive admin
│   │   ├── Login.jsx             # Authentication
│   │   └── Signup.jsx            # Registration
│   ├── components/
│   │   └── Navigation.jsx        # Navigation bar
│   ├── App.jsx                   # Main app router
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── server.js                     # Express server
└── index.html                    # HTML template
```

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   This starts both the Vite dev server (port 3000) and Express server (port 3001)

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Demo Credentials

- **Email**: demo@example.com
- **Password**: password

## Features Breakdown

### Health Check (AI Diagnostics)
- Image upload via drag-and-drop or file picker
- Camera capture functionality
- Mock ML predictions with confidence scores
- Severity level indicators
- Quick doctor booking from results

### Emergency SOS
- Pulse animation for active SOS alerts
- Real-time location detection
- Emergency contact management
- Add/remove/edit contacts
- SOS alert notifications

### Doctor Appointments
- 4-step booking process:
  1. Select doctor by specialty and rating
  2. Choose date from interactive calendar
  3. Select appointment time
  4. Enter patient details
- Appointment confirmation with ID
- Email notification preview

### Blood Donation Admin
- Blood group filtering (O+, O-, A+, A-, B+, B-, AB+, AB-)
- Message composition with preview
- Bulk email sending
- Campaign statistics
- Recipient tracking

## Styling

- **Color Scheme**: Blue/Cyan primary, Red secondary for emergency
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design, works on all devices
- **Glass Effect**: Modern frosted glass navigation bar

## API Endpoints (Mock)

- `POST /api/health/predict` - Image analysis
- `POST /api/sos/trigger` - Emergency alert
- `GET /api/appointments/slots` - Available time slots
- `POST /api/appointments/book` - Book appointment
- `POST /api/mailer/send-blood-donation` - Send bulk emails

## Environment Variables

Create a `.env` file if backend integration is needed:

```
REACT_APP_API_URL=http://localhost:5000
```

## Performance

- Optimized React components with memoization
- Code splitting with React Router
- Lazy loading of images
- Efficient animations with Framer Motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Real ML model integration (TensorFlow.js)
- Payment gateway for appointments
- Video consultation integration
- Patient medical records
- Prescription management
- Appointment reminders via SMS
- Doctor reviews and ratings

## Deployment

### Vercel/Netlify
```bash
npm run build
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "server"]
```

## License

MIT License - Feel free to use this project for your hackathon or production application.

## Support

For issues or questions, please create an issue or contact the development team.

---

Built with ❤️ for MediConnect
