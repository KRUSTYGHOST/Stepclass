# MediConnect Frontend

A modern, full-featured healthcare web application frontend built with React and Tailwind CSS.

## Features

- 🏠 **Home Page** - Beautiful landing page with feature overview
- 🔬 **AI Disease Detection** - Image upload and camera capture for disease analysis
- 🆘 **SOS Emergency** - One-tap emergency alerts with GPS location
- 📅 **Appointment Booking** - Calendar-based doctor appointment system
- 📧 **Admin Mailer** - Mass email system for blood donation alerts

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── DiseaseDetection.jsx
│   │   ├── SOSEmergency.jsx
│   │   ├── AppointmentBooking.jsx
│   │   └── AdminMailer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Features Overview

### Disease Detection
- Upload images or capture via camera
- AI-powered analysis (mock implementation)
- Results display with confidence scores and recommendations

### SOS Emergency
- Add/manage emergency contacts
- One-tap SOS button
- GPS location sharing
- SMS/Email notifications (mock)

### Appointment Booking
- Doctor selection
- Calendar view for date selection
- Time slot booking
- Appointment management

### Admin Mailer
- Blood group filtering
- Bulk email composition
- Email history tracking
- Student statistics dashboard

## Notes

- This is a frontend-only implementation
- Backend API endpoints are mocked with setTimeout
- Replace mock API calls with actual backend integration
- Location services require HTTPS in production
- Camera access requires user permission

## Customization

- Colors can be customized in `tailwind.config.js`
- Component styles can be modified in individual component files
- Add new routes in `App.jsx`

## License

MIT
