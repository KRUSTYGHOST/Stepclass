import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle, X } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, isSameDay, isPast } from 'date-fns'

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookings, setBookings] = useState([])
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  })

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', available: true },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Dermatologist', available: true },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'General Physician', available: true },
    { id: 4, name: 'Dr. David Kim', specialization: 'Ophthalmologist', available: true },
  ]

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  ]

  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])

  // Generate calendar days (next 4 weeks)
  const getCalendarDays = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 })
    const days = []
    for (let i = 0; i < 28; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  const calendarDays = getCalendarDays()

  const handleDateSelect = (date) => {
    if (!isPast(date) || isSameDay(date, new Date())) {
      setSelectedDate(date)
      setSelectedSlot(null)
      setShowBookingForm(false)
    }
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!selectedSlot || !selectedDate) return

    const newBooking = {
      id: Date.now(),
      date: selectedDate,
      slot: selectedSlot,
      doctor: selectedDoctor,
      ...bookingForm,
      status: 'Confirmed',
    }

    setBookings([...bookings, newBooking])
    setShowBookingForm(false)
    setSelectedSlot(null)
    setBookingForm({ name: '', email: '', phone: '', reason: '' })
    alert('Appointment booked successfully!')
  }

  const isSlotBooked = (date, slot) => {
    return bookings.some(
      (booking) =>
        isSameDay(booking.date, date) &&
        booking.slot === slot &&
        booking.doctor.id === selectedDoctor.id
    )
  }

  const isSlotPast = (date, slot) => {
    if (isPast(date) && !isSameDay(date, new Date())) return true
    if (isSameDay(date, new Date())) {
      const [time, period] = slot.split(' ')
      const [hours, minutes] = time.split(':')
      let hour24 = parseInt(hours)
      if (period === 'PM' && hour24 !== 12) hour24 += 12
      if (period === 'AM' && hour24 === 12) hour24 = 0
      const slotTime = new Date()
      slotTime.setHours(hour24, parseInt(minutes), 0, 0)
      return slotTime < new Date()
    }
    return false
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <Calendar className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Book Appointment
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Select a date, time slot, and doctor to book your appointment
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Doctor Selection */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Select Doctor</h2>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => {
                  setSelectedDoctor(doctor)
                  setSelectedSlot(null)
                  setShowBookingForm(false)
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedDoctor.id === doctor.id
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{doctor.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
                  </div>
                  {selectedDoctor.id === doctor.id && (
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Select Date</h2>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
            {calendarDays.map((date, index) => {
              const isSelected = isSameDay(date, selectedDate)
              const isDisabled = isPast(date) && !isSameDay(date, new Date())
              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`p-3 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-primary-600 text-white font-bold shadow-md'
                      : isDisabled
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {format(date, 'd')}
                </button>
              )
            })}
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              Available Time Slots - {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((slot) => {
                const booked = isSlotBooked(selectedDate, slot)
                const past = isSlotPast(selectedDate, slot)
                const isSelected = selectedSlot === slot
                const disabled = booked || past

                return (
                  <button
                    key={slot}
                    onClick={() => !disabled && handleSlotSelect(slot)}
                    disabled={disabled}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white shadow-md'
                        : disabled
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-300 dark:hover:border-primary-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Clock className="h-4 w-4 inline mr-1" />
                    {slot}
                    {booked && <span className="block text-xs mt-1">Booked</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Confirm Booking</h2>
              <button
                onClick={() => {
                  setShowBookingForm(false)
                  setSelectedSlot(null)
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{selectedDoctor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{selectedSlot}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="input-field"
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason for Visit
                </label>
                <textarea
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Brief description of your concern..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm(false)
                    setSelectedSlot(null)
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My Bookings */}
      {bookings.length > 0 && (
        <div className="card mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">My Appointments</h2>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {booking.doctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{booking.doctor.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.doctor.specialization}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300 ml-13">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(booking.date, 'MMM d, yyyy')}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.slot}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{booking.email}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
