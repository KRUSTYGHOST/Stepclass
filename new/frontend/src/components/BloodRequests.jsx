import { useState } from 'react'
import { AlertCircle, Phone, MapPin, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock blood requests data - sorted by criticality
const bloodRequestsData = [
  {
    id: 1,
    patientName: 'Rajesh Kumar',
    hospital: 'Apollo Hospitals Chennai',
    bloodType: 'O-',
    quantity: 5,
    criticality: 'Critical',
    reason: 'Emergency Surgery',
    timeUrgent: 'Within 2 hours',
    contact: '+91-9876-543-210',
    location: 'Greams Road, Chennai',
    avatar: '🏥',
    date: '2024-01-26',
  },
  {
    id: 2,
    patientName: 'Priya Singh',
    hospital: 'Fortis Malar Hospital',
    bloodType: 'A+',
    quantity: 3,
    criticality: 'Critical',
    reason: 'Post-delivery Complications',
    timeUrgent: 'Within 4 hours',
    contact: '+91-9876-543-211',
    location: 'Adyar, Chennai',
    avatar: '🏥',
    date: '2024-01-26',
  },
  {
    id: 3,
    patientName: 'Arjun Patel',
    hospital: 'St. Isabels Hospital',
    bloodType: 'B+',
    quantity: 4,
    criticality: 'High',
    reason: 'Burn Injuries',
    timeUrgent: 'Within 6 hours',
    contact: '+91-9876-543-212',
    location: 'Mylapore, Chennai',
    avatar: '🏥',
    date: '2024-01-26',
  },
  {
    id: 4,
    patientName: 'Kavya Desai',
    hospital: 'Sri Ramachandra Hospital',
    bloodType: 'AB+',
    quantity: 2,
    criticality: 'High',
    reason: 'Chronic Anemia Treatment',
    timeUrgent: 'Within 8 hours',
    contact: '+91-9876-543-213',
    location: 'Porur, Chennai',
    avatar: '🏥',
    date: '2024-01-26',
  },
  {
    id: 5,
    patientName: 'Vikram Reddy',
    hospital: 'Red Cross Blood Bank',
    bloodType: 'O+',
    quantity: 3,
    criticality: 'Medium',
    reason: 'Scheduled Surgery',
    timeUrgent: 'Within 24 hours',
    contact: '+91-9876-543-214',
    location: 'Nungambakkam, Chennai',
    avatar: '🏥',
    date: '2024-01-26',
  },
]

const getCriticalityColor = (criticality) => {
  switch (criticality) {
    case 'Critical':
      return 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700'
    case 'High':
      return 'bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700'
    case 'Medium':
      return 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700'
    default:
      return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
  }
}

const getCriticalityBadgeColor = (criticality) => {
  switch (criticality) {
    case 'Critical':
      return 'bg-red-500 text-white'
    case 'High':
      return 'bg-orange-500 text-white'
    case 'Medium':
      return 'bg-yellow-500 text-white'
    default:
      return 'bg-slate-500 text-white'
  }
}

export default function BloodRequests() {
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Sort requests by criticality
  const sortedRequests = [...bloodRequestsData].sort((a, b) => {
    const criticalityOrder = { Critical: 0, High: 1, Medium: 2 }
    return criticalityOrder[a.criticality] - criticalityOrder[b.criticality]
  })

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Heart className="text-red-600 dark:text-red-400" size={28} />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Urgent Blood Requests</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Requests sorted by urgency - Critical cases require immediate attention
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6 grid grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-slate-700 dark:text-slate-300">Critical (Urgent)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-slate-700 dark:text-slate-300">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-700 dark:text-slate-300">Medium Priority</span>
        </div>
      </div>

      {/* Blood Requests Grid */}
      <div className="space-y-4">
        {sortedRequests.map((request, idx) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedRequest(request)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${getCriticalityColor(request.criticality)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-3xl">{request.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{request.patientName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCriticalityBadgeColor(request.criticality)}`}>
                      {request.criticality}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{request.hospital}</p>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {/* Blood Type */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Blood Type</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700/50 px-2 py-1 rounded">
                        {request.bloodType}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Units Needed</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{request.quantity} units</p>
                    </div>

                    {/* Reason */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Reason</p>
                      <p className="text-sm text-slate-900 dark:text-white">{request.reason}</p>
                    </div>

                    {/* Time Urgent */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Time</p>
                      <p className="text-sm text-slate-900 dark:text-white flex items-center gap-1">
                        <Clock size={14} /> {request.timeUrgent}
                      </p>
                    </div>
                  </div>

                  {/* Contact & Location */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-300 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Phone size={16} />
                      <span className="text-sm">{request.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <MapPin size={16} />
                      <span className="text-sm">{request.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Request Detail Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedRequest.patientName}</h3>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getCriticalityBadgeColor(selectedRequest.criticality)}`}>
                  {selectedRequest.criticality}
                </span>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-2xl font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Hospital</p>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedRequest.hospital}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Blood Type Required</p>
                  <p className="text-2xl font-bold text-red-600">{selectedRequest.bloodType}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Units Needed</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedRequest.quantity}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Medical Reason</p>
                <p className="text-slate-900 dark:text-white">{selectedRequest.reason}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Time Required</p>
                <p className="text-slate-900 dark:text-white font-semibold flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-600" />
                  {selectedRequest.timeUrgent}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Contact</p>
                  <a href={`tel:${selectedRequest.contact}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    <Phone size={16} />
                    <span className="text-sm break-all">{selectedRequest.contact}</span>
                  </a>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Location</p>
                  <p className="flex items-start gap-2 text-slate-900 dark:text-white">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{selectedRequest.location}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRequest(null)}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Donate Now
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
