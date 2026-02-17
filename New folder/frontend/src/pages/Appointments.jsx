import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import api from '../utils/api'
import { format } from 'date-fns'

const Appointments = () => {
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [reason, setReason] = useState('')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchDoctors()
    fetchAppointments()
  }, [])

  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailableSlots()
    }
  }, [selectedDoctor, selectedDate])

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/api/users/doctors')
      setDoctors(response.data)
    } catch (err) {
      console.error('Error fetching doctors:', err)
    }
  }

  const fetchAvailableSlots = async () => {
    if (!selectedDoctor) return
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd')
      const response = await api.get(`/api/appointments/available-slots?doctor_id=${selectedDoctor}&date=${dateStr}`)
      setAvailableSlots(response.data.available_slots || [])
    } catch (err) {
      console.error('Error fetching slots:', err)
      setAvailableSlots([])
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/api/appointments/')
      setAppointments(response.data)
    } catch (err) {
      console.error('Error fetching appointments:', err)
    }
  }

  const handleBookAppointment = async (e) => {
    e.preventDefault()
    if (!selectedDoctor || !selectedSlot) {
      setError('Please select a doctor and time slot')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/api/appointments/', {
        doctor_id: parseInt(selectedDoctor),
        appointment_date: selectedSlot,
        duration_minutes: 30,
        reason: reason
      })
      setSuccess('Appointment booked successfully!')
      setSelectedDoctor('')
      setSelectedSlot('')
      setReason('')
      fetchAppointments()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error booking appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '100px', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>📅 Book Appointment</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>New Appointment</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleBookAppointment}>
              <div className="form-group">
                <label>Select Doctor</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.full_name} - {doctor.email}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDoctor && (
                <>
                  <div className="form-group">
                    <label>Select Date</label>
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      minDate={new Date()}
                    />
                  </div>

                  {availableSlots.length > 0 && (
                    <div className="form-group">
                      <label>Available Time Slots</label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '0.5rem',
                        marginTop: '0.5rem'
                      }}>
                        {availableSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className="btn"
                            style={{
                              background: selectedSlot === slot ? 'var(--primary-color)' : 'var(--bg-light)',
                              color: selectedSlot === slot ? 'white' : 'var(--text-dark)',
                              border: '1px solid var(--border-color)'
                            }}
                          >
                            {format(new Date(slot), 'HH:mm')}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Reason (Optional)</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows="3"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !selectedSlot}
                    style={{ width: '100%' }}
                  >
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </button>
                </>
              )}
            </form>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>My Appointments</h2>
            {appointments.length === 0 ? (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
                No appointments scheduled
              </p>
            ) : (
              <div>
                {appointments.map(apt => (
                  <div
                    key={apt.id}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <h4>{apt.doctor?.full_name || 'Doctor'}</h4>
                    <p style={{ color: 'var(--text-light)', margin: '0.5rem 0' }}>
                      {format(new Date(apt.appointment_date), 'PPP p')}
                    </p>
                    {apt.reason && (
                      <p style={{ color: 'var(--text-light)' }}>Reason: {apt.reason}</p>
                    )}
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      background: apt.status === 'scheduled' ? '#D1FAE5' : '#FEE2E2',
                      color: apt.status === 'scheduled' ? '#065F46' : '#991B1B',
                      fontSize: '0.875rem'
                    }}>
                      {apt.status}
                    </span>
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

export default Appointments
