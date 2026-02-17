import React, { useState } from 'react'
import api from '../utils/api'

const SOSButton = () => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [location, setLocation] = useState('')

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude},${position.coords.longitude}`)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const handleSOS = async () => {
    if (!window.confirm('Are you sure you want to send an SOS alert to your emergency contacts?')) {
      return
    }

    setLoading(true)
    getLocation()

    try {
      const [lat, lng] = location ? location.split(',') : [null, null]
      const response = await api.post('/api/sos/', {
        latitude: lat,
        longitude: lng,
        message: message || 'Emergency assistance needed!',
        location_address: location
      })

      alert(`SOS Alert Sent! ${response.data.message}`)
      setShowModal(false)
      setMessage('')
      setLocation('')
    } catch (error) {
      alert('Error sending SOS: ' + (error.response?.data?.detail || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className="sos-button"
        onClick={() => setShowModal(true)}
        disabled={loading}
        title="SOS Emergency"
      >
        SOS
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div className="card" style={{ maxWidth: '500px', width: '90%' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--danger-color)' }}>🚨 SOS Emergency Alert</h2>
            <div className="form-group">
              <label>Emergency Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your emergency..."
                rows="4"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleSOS} disabled={loading}>
                {loading ? 'Sending...' : 'Send SOS Alert'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SOSButton
