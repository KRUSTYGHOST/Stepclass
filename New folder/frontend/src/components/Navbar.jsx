import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeAuthToken } from '../utils/auth'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeAuthToken()
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🏥 MediConnect
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Link to="/detect" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Disease Detection</Link>
              <Link to="/appointments" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Appointments</Link>
              <Link to="/emergency-contacts" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Emergency Contacts</Link>
              <Link to="/admin/mailer" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Admin</Link>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
