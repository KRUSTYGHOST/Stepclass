import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DiseaseDetection from './pages/DiseaseDetection'
import Appointments from './pages/Appointments'
import EmergencyContacts from './pages/EmergencyContacts'
import AdminMailer from './pages/AdminMailer'
import SOSButton from './components/SOSButton'
import { getAuthToken } from './utils/auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/detect" 
            element={isAuthenticated ? <DiseaseDetection /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/appointments" 
            element={isAuthenticated ? <Appointments /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/emergency-contacts" 
            element={isAuthenticated ? <EmergencyContacts /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/mailer" 
            element={isAuthenticated ? <AdminMailer /> : <Navigate to="/login" />} 
          />
        </Routes>
        {isAuthenticated && <SOSButton />}
      </div>
    </Router>
  )
}

export default App
