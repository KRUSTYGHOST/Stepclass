import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import HealthCheck from './pages/HealthCheck'
import Appointments from './pages/Appointments'
import Emergency from './pages/Emergency'
import BloodDonation from './pages/BloodDonation'
import ContactUs from './pages/ContactUs'
import MeetDonors from './pages/MeetDonors'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health-check" element={<HealthCheck />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/blood-donation" element={<BloodDonation />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/meet-donors" element={<MeetDonors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
