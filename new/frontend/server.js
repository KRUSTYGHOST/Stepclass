import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Mock API endpoints for frontend development
app.post('/api/health/predict', (req, res) => {
  res.json({
    success: true,
    prediction: 'Acne (Mild)',
    confidence: 0.92,
    recommendation: 'Please consult a dermatologist for proper treatment',
    severity: 'moderate'
  });
});

app.post('/api/sos/trigger', (req, res) => {
  const { contacts, location, message } = req.body;
  res.json({
    success: true,
    message: 'SOS alert sent to emergency contacts',
    contactsNotified: contacts.length
  });
});

app.get('/api/appointments/slots', (req, res) => {
  const today = new Date();
  const slots = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    slots.push({
      date: date.toISOString().split('T')[0],
      slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    });
  }
  res.json(slots);
});

app.post('/api/appointments/book', (req, res) => {
  res.json({
    success: true,
    appointmentId: 'APT' + Date.now(),
    message: 'Appointment booked successfully',
    confirmationEmail: 'Confirmation sent to your email'
  });
});

app.post('/api/mailer/send-blood-donation', (req, res) => {
  const { bloodGroup, message, recipientCount } = req.body;
  res.json({
    success: true,
    message: 'Blood donation emails sent',
    recipientCount: recipientCount || 100,
    bloodGroupFiltered: bloodGroup || 'All'
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
