import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, Check, Loader, ChevronLeft, ChevronRight, Award, Gift } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: '',
    notes: ''
  })
  const [booked, setBooked] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const doctors = [
    { id: 1, name: 'Dr. Suresh Kumar', specialty: 'Cardiology', rating: 4.9, reviews: 240, experience: '15+ years', qualification: 'MD, DM (Cardiology)', hospital: 'SRM Global Hospital, Potheri' },
    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Orthopedics', rating: 4.8, reviews: 185, experience: '12+ years', qualification: 'MBBS, MS (Orthopedics)', hospital: 'SRM Global Hospital, Potheri' },
    { id: 3, name: 'Dr. Rajesh Nair', specialty: 'General Surgery', rating: 4.7, reviews: 210, experience: '14+ years', qualification: 'MBBS, MS (General Surgery)', hospital: 'SRM Global Hospital, Potheri' },
    { id: 4, name: 'Dr. Kavya Reddy', specialty: 'Internal Medicine', rating: 4.8, reviews: 165, experience: '11+ years', qualification: 'MBBS, MD (Internal Medicine)', hospital: 'SRM Global Hospital, Potheri' },
    { id: 5, name: 'Dr. Vikram Singh', specialty: 'Neurology', rating: 4.9, reviews: 120, experience: '13+ years', qualification: 'MBBS, DM (Neurology)', hospital: 'SRM Global Hospital, Potheri' },
    { id: 6, name: 'Dr. Anjali Verma', specialty: 'Gynecology', rating: 4.8, reviews: 195, experience: '12+ years', qualification: 'MBBS, MD (Obstetrics & Gynecology)', hospital: 'SRM Global Hospital, Potheri' },
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  const donorBadges = [
    { badge: 'Platinum', color: 'from-purple-400 to-purple-600', discount: 25 },
    { badge: 'Gold', color: 'from-yellow-400 to-yellow-600', discount: 20 },
    { badge: 'Silver', color: 'from-gray-300 to-gray-500', discount: 15 },
    { badge: 'Bronze', color: 'from-orange-400 to-orange-600', discount: 10 },
    { badge: 'Supporter', color: 'from-green-400 to-green-600', discount: 5 },
  ]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !formData.fullName || !formData.email) {
      toast.error('Please complete all required fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor: selectedDoctor,
          date: selectedDate,
          time: selectedTime,
          ...formData
        })
      })

      const data = await response.json()
      setBooked(data)
      toast.success('Appointment booked successfully!')
      setBookingStep(4)
    } catch (error) {
      toast.error('Failed to book appointment')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedDoctor(null)
    setBookingStep(1)
    setFormData({ fullName: '', email: '', phone: '', reason: '', notes: '' })
    setBooked(null)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const isDateAvailable = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    return date >= today
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Doctor Appointments</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Book appointments with verified doctors from SRM Global Hospital, Potheri
          </p>
        </motion.div>

        {/* Donor Badge Discount Section */}
        {!booked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gift className="text-red-500 dark:text-red-400" size={28} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Are You A Donor?</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Select your donor badge to receive appointment discounts! Visit the{' '}
              <a href="/meet-donors" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Meet Donors
              </a>
              {' '}page to see all rewards.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {donorBadges.map((item) => (
                <motion.button
                  key={item.badge}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedBadge(selectedBadge === item.badge ? null : item.badge)}
                  className={`p-4 rounded-xl text-center transition-all border-2 ${
                    selectedBadge === item.badge
                      ? 'border-green-500 ring-2 ring-green-300 dark:ring-green-600 scale-105'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-white font-bold text-xs mb-2 bg-gradient-to-r ${item.color}`}>
                    {item.badge}
                  </div>
                  <p className="font-bold text-green-600 dark:text-green-400 text-lg">{item.discount}%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Discount</p>
                  {selectedBadge === item.badge && (
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 mt-2">✓ Selected</p>
                  )}
                </motion.button>
              ))}
            </div>
            {selectedBadge && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800"
              >
                <p className="text-green-800 dark:text-green-300 font-semibold">
                  ✓ {selectedBadge} Donor Badge Applied - {donorBadges.find(b => b.badge === selectedBadge)?.discount}% discount will be calculated on appointment fees
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Progress Steps */}
        {!booked && (
          <div className="mb-12 flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center flex-1"
              >
                <button
                  onClick={() => bookingStep >= step && setBookingStep(step)}
                  className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                    bookingStep >= step
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {step}
                </button>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${bookingStep > step ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Booking Content */}
        {booked ? (
          // Success Screen
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-block p-4 bg-green-100 rounded-full mb-6"
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">Appointment Confirmed!</h2>
              <p className="text-slate-600 mb-8">
                A confirmation email has been sent to {formData.email}
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-8 mb-8 text-left border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">Doctor</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {doctors.find(d => d.id === selectedDoctor)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">Specialty</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {doctors.find(d => d.id === selectedDoctor)?.specialty}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">Date</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedDate?.toDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">Time</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedTime}</p>
                  </div>
                </div>
              </div>

              {selectedBadge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 mb-8 border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="text-green-600 dark:text-green-400" size={24} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Donor Badge Applied</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {donorBadges.find(b => b.badge === selectedBadge)?.discount}% Discount
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-300">
                    Thank you for your donations! Your {selectedBadge} donor badge has been applied to reduce your appointment cost.
                  </p>
                </motion.div>
              )}

              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 mb-8">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <span className="font-bold">Appointment ID:</span> {booked.appointmentId}
                </p>
              </div>

              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Book Another Appointment
              </button>
            </div>
          </motion.div>
        ) : bookingStep === 1 ? (
          // Step 1: Select Doctor
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Select a Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <motion.button
                  key={doctor.id}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setSelectedDoctor(doctor.id)
                    setBookingStep(2)
                  }}
                  className={`p-6 rounded-xl text-left border-2 transition-all ${
                    selectedDoctor === doctor.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{doctor.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">{doctor.specialty}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{doctor.qualification}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{doctor.experience}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-500">{doctor.rating}★</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{doctor.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="mb-3 pb-3 border-t border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{doctor.hospital}</p>
                  </div>
                  {selectedDoctor === doctor.id && (
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <Check size={18} />
                      Selected
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : bookingStep === 2 ? (
          // Step 2: Select Date & Time
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8 mb-8"
          >
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg mb-4">Select Date</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="font-semibold">{monthName}</span>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {renderCalendar().map((day, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={day && isDateAvailable(day) ? { scale: 1.1 } : {}}
                      onClick={() => {
                        if (day && isDateAvailable(day)) {
                          setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
                        }
                      }}
                      className={`py-2 rounded-lg font-semibold transition-all ${
                        !day
                          ? 'text-transparent'
                          : !isDateAvailable(day)
                          ? 'text-slate-300 cursor-not-allowed'
                          : selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth()
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 hover:bg-blue-100 text-slate-900'
                      }`}
                    >
                      {day}
                    </motion.button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <p className="text-sm font-semibold text-blue-900">
                    Selected: {selectedDate.toDateString()}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="font-bold text-lg mb-4">Select Time</h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        selectedTime === time
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 hover:bg-blue-100 text-slate-900'
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>

                {selectedDate && selectedTime && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setBookingStep(3)}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Next: Your Details
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ) : bookingStep === 3 ? (
          // Step 3: Personal Details
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <h3 className="font-bold text-lg mb-6">Your Details</h3>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1-234-567-8900"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Reason for Visit</label>
                  <input
                    type="text"
                    placeholder="e.g., Skin consultation"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Additional Notes</label>
                  <textarea
                    placeholder="Any medical history or concerns?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setBookingStep(2)}
                  className="flex-1 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Booking...
                    </>
                  ) : (
                    'Confirm Appointment'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
