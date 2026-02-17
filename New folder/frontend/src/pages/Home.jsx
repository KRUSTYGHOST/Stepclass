import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ marginTop: '80px' }}>
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Welcome to <span style={{ color: '#FCD34D' }}>MediConnect</span>
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95 }}>
            A comprehensive healthcare platform connecting students with healthcare professionals
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', background: 'white', color: '#3B82F6' }}>
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none', background: 'transparent', border: '2px solid white', color: 'white' }}>
              Login
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--bg-light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Features</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔬</div>
              <h3 style={{ marginBottom: '1rem' }}>AI Disease Detection</h3>
              <p style={{ color: 'var(--text-light)' }}>
                Upload images of skin conditions, eye problems, or other symptoms for AI-powered analysis and recommendations.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
              <h3 style={{ marginBottom: '1rem' }}>SOS Emergency</h3>
              <p style={{ color: 'var(--text-light)' }}>
                One-tap SOS button to instantly notify your emergency contacts with your location.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ marginBottom: '1rem' }}>Appointment Booking</h3>
              <p style={{ color: 'var(--text-light)' }}>
                Easily book appointments with healthcare professionals through our calendar system.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🩸</div>
              <h3 style={{ marginBottom: '1rem' }}>Blood Donation</h3>
              <p style={{ color: 'var(--text-light)' }}>
                Connect with blood donation drives and help save lives in your community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
