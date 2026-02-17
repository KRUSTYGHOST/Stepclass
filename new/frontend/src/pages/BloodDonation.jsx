import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Send, Users, Check, Loader, AlertCircle, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import BloodDonationMap from '../components/BloodDonationMap'
import BloodRequests from '../components/BloodRequests'

export default function BloodDonation() {
  const [isAdmin] = useState(true) // For demo purposes
  const [bloodGroup, setBloodGroup] = useState('All')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(null)

  const bloodGroups = ['All', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

  const handleSendMail = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message')
      return
    }

    setSending(true)
    try {
      const response = await fetch('/api/mailer/send-blood-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bloodGroup: bloodGroup !== 'All' ? bloodGroup : null,
          message,
          recipientCount: Math.floor(Math.random() * 200) + 100
        })
      })

      const data = await response.json()
      setSent(data)
      toast.success(`Mails sent to ${data.recipientCount} donors!`)
      setMessage('')
      setBloodGroup('All')
    } catch (error) {
      toast.error('Failed to send mails')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-slate-50 to-white dark:from-slate-950 dark:via-green-950/20 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
              Save Lives
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Blood Donation Drive</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Connect blood donors with those in urgent need. Send mass notification emails to all registered donors.
          </p>
        </motion.div>

        {/* Blood Donation Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <BloodDonationMap />
        </motion.div>

        {/* Blood Requests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <BloodRequests />
        </motion.div>

        {/* Meet Our Donors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-16 bg-gradient-to-r from-red-50 dark:from-red-950/30 to-pink-50 dark:to-pink-950/30 rounded-2xl p-8 border border-red-200 dark:border-red-800"
        >
          <div className="flex items-start justify-between flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Award className="text-red-600 dark:text-red-400" size={28} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Meet Our Heroes</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Celebrate the generous donors who have saved countless lives through regular blood donations.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Your donations make a difference! Earn badges and get discounts on doctor appointments at SRM Global Hospital.
              </p>
              <Link
                to="/meet-donors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:from-red-600 hover:to-red-700"
              >
                View Our Donors <Users size={18} />
              </Link>
            </div>
            <div className="text-right">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { badge: 'Platinum', emoji: '💜', discount: '25%' },
                  { badge: 'Gold', emoji: '💛', discount: '20%' },
                  { badge: 'Silver', emoji: '🩶', discount: '15%' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.badge}</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">{item.discount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {isAdmin ? (
          <>
            {/* Admin Dashboard */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Active Donors', value: '2,450', color: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' },
                { label: 'Verified Contacts', value: '98%', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' },
                { label: 'Recent Drives', value: '12', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-xl border border-slate-200 dark:border-slate-700 ${stat.color} bg-white dark:bg-slate-800`}
                >
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Form */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Send Blood Donation Alert</h2>

                {/* Blood Group Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Filter by Blood Group
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {bloodGroups.map((bg) => (
                      <motion.button
                        key={bg}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setBloodGroup(bg)}
                        className={`py-2 rounded-lg font-semibold transition-all ${
                          bloodGroup === bg
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                        }`}
                      >
                        {bg}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Message *
                  </label>
                  <textarea
                    placeholder="Enter the blood donation alert message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                {/* Preview */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Email Preview:</p>
                    <div className="bg-white dark:bg-slate-800 rounded p-3 text-sm">
                      <p className="font-bold text-slate-900 dark:text-white mb-2">Subject: Urgent Blood Donation Request</p>
                      <p className="text-slate-700 dark:text-slate-300">{message}</p>
                    </div>
                  </motion.div>
                )}

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendMail}
                  disabled={sending || !message.trim()}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send to Donors
                    </>
                  )}
                </motion.button>
              </div>

              {/* Stats & Recent Activity */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Campaign Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-2">
                        Recipients
                      </p>
                      <div className="flex items-center gap-3">
                        <Users className="text-green-600 dark:text-green-400" size={20} />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {sent ? sent.recipientCount : 2450}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-2">
                        Blood Group
                      </p>
                      <span className={`inline-block px-4 py-2 rounded-lg font-bold ${
                        bloodGroup === 'All'
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                          : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                      }`}>
                        {bloodGroup}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-green-50 dark:from-green-950/30 to-emerald-50 dark:to-emerald-950/30 rounded-2xl p-8 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-green-500 rounded-full flex-shrink-0">
                        <Check className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900 dark:text-green-300 mb-1">Emails Sent Successfully!</h4>
                        <p className="text-sm text-green-800 dark:text-green-400">
                          {sent.recipientCount} donors have been notified
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSent(null)}
                      className="text-sm text-green-700 dark:text-green-400 font-semibold hover:text-green-900 dark:hover:text-green-300"
                    >
                      Send Another Campaign
                    </button>
                  </motion.div>
                )}

                {/* Important Note */}
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-3">
                    <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-blue-900 dark:text-blue-300 mb-1">Admin Only Feature</p>
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        This feature is restricted to verified administrators. All campaigns are logged.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          // Non-Admin View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-slate-200">
              <Droplets className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Register as a Donor</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Be part of our lifesaving community. Register now to receive blood donation alerts and help save lives.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Register as Donor
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
