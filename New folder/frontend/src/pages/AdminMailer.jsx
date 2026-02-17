import React, { useState, useEffect } from 'react'
import api from '../utils/api'

const AdminMailer = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    blood_group: ''
  })
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/mailer/stats')
      setStats(response.data)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const data = {
        subject: formData.subject,
        message: formData.message,
        blood_group: formData.blood_group || null
      }
      const response = await api.post('/api/mailer/blood-donation', data)
      setSuccess(response.data.message)
      setFormData({
        subject: '',
        message: '',
        blood_group: ''
      })
      fetchStats()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error sending emails')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '100px', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>🩸 Blood Donation Mailer (Admin)</h1>

        {stats && (
          <div className="card" style={{ marginBottom: '2rem', background: 'var(--bg-light)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Statistics</h3>
            <p><strong>Total Students:</strong> {stats.total_students}</p>
            {Object.keys(stats.students_by_blood_group).length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>By Blood Group:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {Object.entries(stats.students_by_blood_group).map(([bg, count]) => (
                    <li key={bg}>{bg}: {count} students</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem' }}>Send Blood Donation Request</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., URGENT: Blood Donation Needed"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="6"
                placeholder="Enter the message to send to all students..."
                required
              />
            </div>

            <div className="form-group">
              <label>Filter by Blood Group (Optional)</label>
              <select
                value={formData.blood_group}
                onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <small style={{ color: 'var(--text-light)', display: 'block', marginTop: '0.5rem' }}>
                Leave empty to send to all students
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-danger"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Bulk Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminMailer
