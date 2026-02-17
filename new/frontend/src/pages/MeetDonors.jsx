import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Award, Droplets, TrendingUp } from 'lucide-react'

// Mock donor data
const donorsData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    photo: '👨‍🔬',
    donated: 45,
    donations: 15,
    badge: 'Platinum',
    badgeColor: 'from-purple-400 to-purple-600',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/30',
    discount: 25,
    testimonial: 'Blood donation is my way of giving back to society. Every drop counts!'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    photo: '👩‍⚕️',
    donated: 32,
    donations: 12,
    badge: 'Gold',
    badgeColor: 'from-yellow-400 to-yellow-600',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/30',
    discount: 20,
    testimonial: 'Saving lives through blood donation is the best feeling in the world.'
  },
  {
    id: 3,
    name: 'Arjun Patel',
    photo: '👨‍💼',
    donated: 28,
    donations: 10,
    badge: 'Gold',
    badgeColor: 'from-yellow-400 to-yellow-600',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/30',
    discount: 20,
    testimonial: 'Regular donations have become part of my healthy lifestyle routine.'
  },
  {
    id: 4,
    name: 'Kavya Desai',
    photo: '👩‍🎓',
    donated: 18,
    donations: 8,
    badge: 'Silver',
    badgeColor: 'from-gray-300 to-gray-500',
    badgeBg: 'bg-gray-50 dark:bg-gray-950/30',
    discount: 15,
    testimonial: 'Happy to contribute to saving someone\'s life through blood donation.'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    photo: '👨‍🏫',
    donated: 14,
    donations: 6,
    badge: 'Silver',
    badgeColor: 'from-gray-300 to-gray-500',
    badgeBg: 'bg-gray-50 dark:bg-gray-950/30',
    discount: 15,
    testimonial: 'Blood donation drives have inspired me to help others in need.'
  },
  {
    id: 6,
    name: 'Anjali Verma',
    photo: '👩‍💻',
    donated: 10,
    donations: 5,
    badge: 'Bronze',
    badgeColor: 'from-orange-400 to-orange-600',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/30',
    discount: 10,
    testimonial: 'Starting my journey as a blood donor to make a difference.'
  },
  {
    id: 7,
    name: 'Rohan Gupta',
    photo: '👨‍🏭',
    donated: 8,
    donations: 4,
    badge: 'Bronze',
    badgeColor: 'from-orange-400 to-orange-600',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/30',
    discount: 10,
    testimonial: 'Every donation is a step towards creating a healthier community.'
  },
  {
    id: 8,
    name: 'Sneha Nair',
    photo: '👩‍🌾',
    donated: 5,
    donations: 2,
    badge: 'Supporter',
    badgeColor: 'from-green-400 to-green-600',
    badgeBg: 'bg-green-50 dark:bg-green-950/30',
    discount: 5,
    testimonial: 'Grateful to be part of the MediConnect donor community!'
  },
]

const getBadgeStats = () => {
  return [
    { badge: 'Platinum', color: 'from-purple-400 to-purple-600', donations: '15+', discount: '25%' },
    { badge: 'Gold', color: 'from-yellow-400 to-yellow-600', donations: '10-14', discount: '20%' },
    { badge: 'Silver', color: 'from-gray-300 to-gray-500', donations: '5-9', discount: '15%' },
    { badge: 'Bronze', color: 'from-orange-400 to-orange-600', donations: '3-4', discount: '10%' },
    { badge: 'Supporter', color: 'from-green-400 to-green-600', donations: '1-2', discount: '5%' },
  ]
}

export default function MeetDonors() {
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [sortBy, setSortBy] = useState('donated')

  const sortedDonors = [...donorsData].sort((a, b) => {
    if (sortBy === 'donated') return b.donated - a.donated
    if (sortBy === 'donations') return b.donations - a.donations
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-slate-50 to-white dark:from-slate-950 dark:via-red-950/20 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-red-200 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold">
              Our Heroes
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Meet Our Donors</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Celebrating the generous hearts who save lives through regular blood donations. Each donation is a gift of life!
          </p>
        </motion.div>

        {/* Badge System Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-yellow-600 dark:text-yellow-400" size={28} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Badge & Reward System</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {getBadgeStats().map((item, idx) => (
              <div key={idx} className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className={`inline-block px-4 py-2 rounded-full text-white font-bold mb-2 bg-gradient-to-r ${item.color}`}>
                  {item.badge}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{item.donations} donations</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">{item.discount} discount</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-6 text-center">
            💳 Use your badge to get appointment discounts at SRM Global Hospital, Potheri!
          </p>
        </motion.div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex gap-4 flex-wrap"
        >
          <button
            onClick={() => setSortBy('donated')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              sortBy === 'donated'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600'
            }`}
          >
            <Droplets className="inline mr-2" size={18} />
            Sort by Units Donated
          </button>
          <button
            onClick={() => setSortBy('donations')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              sortBy === 'donations'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-600'
            }`}
          >
            <TrendingUp className="inline mr-2" size={18} />
            Sort by Donations Count
          </button>
        </motion.div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sortedDonors.map((donor, idx) => (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedDonor(donor)}
              className="cursor-pointer group"
            >
              <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-red-300 dark:hover:border-red-600 transition-all h-full`}>
                {/* Avatar */}
                <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
                  {donor.photo}
                </div>

                {/* Badge */}
                <div className="mb-4 text-center">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-white font-bold text-sm bg-gradient-to-r ${donor.badgeColor}`}>
                    {donor.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-2">{donor.name}</h3>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Units Donated</p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">{donor.donated}</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Times Donated</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{donor.donations}</p>
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center mb-4 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Appointment Discount</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{donor.discount}%</p>
                </div>

                {/* View Details Button */}
                <button className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all group-hover:from-red-600 group-hover:to-red-700">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Donor Modal */}
        {selectedDonor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDonor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">{selectedDonor.photo}</div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedDonor.name}</h2>
                <div className={`inline-block px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${selectedDonor.badgeColor}`}>
                  {selectedDonor.badge} Donor
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Units Donated</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{selectedDonor.donated} Units</p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Number of Donations</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedDonor.donations} Times</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Appointment Discount</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{selectedDonor.discount}% OFF</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Valid for doctor appointments at SRM Global Hospital</p>
                </div>
              </div>

              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mb-6 border-l-4 border-red-500">
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                  "{selectedDonor.testimonial}"
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Heart className="inline mr-2" size={18} />
                  Share Love
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 to-pink-50 dark:to-pink-950/30 rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <Droplets className="text-red-600 dark:text-red-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{donorsData.reduce((sum, d) => sum + d.donated, 0)} Units</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Blood Donated</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 to-cyan-50 dark:to-cyan-950/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <Heart className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{donorsData.length}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Active Donors</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 dark:from-green-950/30 to-emerald-50 dark:to-emerald-950/30 rounded-2xl p-8 border border-green-200 dark:border-green-800">
            <TrendingUp className="text-green-600 dark:text-green-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{donorsData.reduce((sum, d) => sum + d.donations, 0)} Donations</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Donations Made</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
