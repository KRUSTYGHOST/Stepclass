import { useState } from 'react'
import { Mail, Send, Users, Filter, AlertCircle, CheckCircle, X } from 'lucide-react'

export default function AdminMailer() {
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    bloodGroup: 'All',
    urgent: false,
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [emailHistory, setEmailHistory] = useState([
    {
      id: 1,
      subject: 'Urgent Blood Donation Needed - Type O+',
      sentDate: new Date('2024-01-20'),
      recipients: 1250,
      bloodGroup: 'O+',
      status: 'Sent',
    },
    {
      id: 2,
      subject: 'Blood Donation Drive - All Types',
      sentDate: new Date('2024-01-15'),
      recipients: 3500,
      bloodGroup: 'All',
      status: 'Sent',
    },
  ])

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const stats = {
    totalStudents: 3500,
    byBloodGroup: {
      'A+': 450,
      'A-': 120,
      'B+': 380,
      'B-': 95,
      'AB+': 180,
      'AB-': 45,
      'O+': 1200,
      'O-': 300,
    },
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    if (!emailForm.subject || !emailForm.message) {
      alert('Please fill in all required fields')
      return
    }

    setIsSending(true)
    setSent(false)

    // Simulate sending email - Replace with actual API call
    setTimeout(() => {
      const recipientCount =
        emailForm.bloodGroup === 'All'
          ? stats.totalStudents
          : stats.byBloodGroup[emailForm.bloodGroup] || 0

      const newEmail = {
        id: Date.now(),
        subject: emailForm.subject,
        sentDate: new Date(),
        recipients: recipientCount,
        bloodGroup: emailForm.bloodGroup,
        status: 'Sent',
      }

      setEmailHistory([newEmail, ...emailHistory])
      setIsSending(false)
      setSent(true)
      setEmailForm({
        subject: '',
        message: '',
        bloodGroup: 'All',
        urgent: false,
      })
      setTimeout(() => setSent(false), 5000)
    }, 2000)
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="card">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This page is restricted to administrators only. Please contact your system administrator
            for access.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
          <Mail className="h-10 w-10 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Mass Blood Donation Mailer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Send bulk emails to registered students for urgent blood donation needs
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Students</p>
              <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-blue-200" />
          </div>
        </div>
        {Object.entries(stats.byBloodGroup).slice(0, 3).map(([group, count]) => (
          <div key={group} className="card bg-gradient-to-r from-red-500 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm mb-1">Blood Type {group}</p>
                <p className="text-3xl font-bold">{count}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="font-bold">{group}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Email Form */}
        <div className="lg:col-span-2 card">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Compose Email</h2>

          {sent && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">
                  Email sent successfully to {emailForm.bloodGroup === 'All' ? stats.totalStudents : stats.byBloodGroup[emailForm.bloodGroup]} recipients!
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSendEmail} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blood Group Filter
                </label>
                <div className="flex items-center space-x-2 mb-4">
                  <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <select
                  value={emailForm.bloodGroup}
                  onChange={(e) => setEmailForm({ ...emailForm, bloodGroup: e.target.value })}
                  className="input-field flex-1"
                >
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group === 'All' ? 'All Blood Groups' : `Blood Type ${group}`}
                    </option>
                  ))}
                </select>
              </div>
              {emailForm.bloodGroup !== 'All' && (
                <p className="text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  Will be sent to{' '}
                  <span className="font-semibold">
                    {stats.byBloodGroup[emailForm.bloodGroup]} students
                  </span>{' '}
                  with blood type {emailForm.bloodGroup}
                </p>
              )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
              <input
                type="text"
                required
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                className="input-field"
                placeholder="e.g., Urgent Blood Donation Needed - Type O+"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
              <textarea
                required
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                className="input-field"
                rows="8"
                placeholder="Dear Students,

We urgently need blood donations of type [BLOOD_GROUP]. Your help can save lives!

Location: [LOCATION]
Date: [DATE]
Time: [TIME]

Please respond if you can help.

Thank you,
MediConnect Team"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="urgent"
                checked={emailForm.urgent}
                onChange={(e) => setEmailForm({ ...emailForm, urgent: e.target.checked })}
                className="w-4 h-4 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
              />
              <label htmlFor="urgent" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mark as Urgent
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>This email will be sent to all registered students</li>
                    <li>Make sure all information is accurate before sending</li>
                    <li>Emails cannot be recalled once sent</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Email to {emailForm.bloodGroup === 'All' ? stats.totalStudents : stats.byBloodGroup[emailForm.bloodGroup]} Recipients</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Email History */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Email History</h2>
          {emailHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-sm">No emails sent yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {emailHistory.map((email) => (
                <div
                  key={email.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm flex-1">
                      {email.subject}
                    </h3>
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {email.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <p className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{email.recipients} recipients</span>
                    </p>
                    <p className="flex items-center space-x-1">
                      <span className="font-semibold">Blood Group:</span>
                      <span>{email.bloodGroup}</span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(email.sentDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
