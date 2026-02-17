import React, { useState, useEffect } from 'react'
import api from '../utils/api'

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    is_primary: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await api.get('/api/emergency-contacts/')
      setContacts(response.data)
    } catch (err) {
      console.error('Error fetching contacts:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/api/emergency-contacts/', formData)
      setSuccess('Emergency contact added successfully!')
      setFormData({
        name: '',
        phone: '',
        email: '',
        relationship: '',
        is_primary: false
      })
      fetchContacts()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error adding contact')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '100px', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>🚨 Emergency Contacts</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Add Emergency Contact</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Relationship</label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  placeholder="e.g., Parent, Friend, Guardian"
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_primary}
                    onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                  />
                  Set as primary contact
                </label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Adding...' : 'Add Contact'}
              </button>
            </form>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>My Emergency Contacts</h2>
            {contacts.length === 0 ? (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
                No emergency contacts added yet. Add your first contact to enable SOS alerts.
              </p>
            ) : (
              <div>
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <h4>{contact.name} {contact.is_primary && <span style={{ color: 'var(--primary-color)' }}>(Primary)</span>}</h4>
                    <p style={{ color: 'var(--text-light)', margin: '0.5rem 0' }}>
                      {contact.relationship && `${contact.relationship} • `}
                      {contact.phone}
                    </p>
                    {contact.email && (
                      <p style={{ color: 'var(--text-light)' }}>{contact.email}</p>
                    )}
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this contact?')) {
                          try {
                            await api.delete(`/api/emergency-contacts/${contact.id}`)
                            fetchContacts()
                          } catch (err) {
                            alert('Error deleting contact')
                          }
                        }
                      }}
                      className="btn btn-danger"
                      style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyContacts
