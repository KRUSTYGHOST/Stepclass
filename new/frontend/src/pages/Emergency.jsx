import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Phone, MapPin, Plus, X, Check, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Emergency() {
  const [sosActive, setSosActive] = useState(false)
  const [location, setLocation] = useState(null)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '+1-234-567-8900', relation: 'Family' },
    { id: 2, name: 'Dr. Smith', phone: '+1-234-567-8901', relation: 'Doctor' },
  ])
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Location access denied')
        }
      )
    }
  }, [])

  const triggerSOS = async () => {
    if (contacts.length === 0) {
      toast.error('Please add emergency contacts first')
      return
    }

    setSending(true)
    setSosActive(true)

    try {
      const response = await fetch('/api/sos/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: contacts.map(c => ({ name: c.name, phone: c.phone })),
          location: location || { lat: 'Unknown', lng: 'Unknown' },
          message: 'EMERGENCY SOS ALERT - I need immediate medical assistance'
        })
      })

      const data = await response.json()
      toast.success(`SOS sent to ${data.contactsNotified} contacts!`)

      // Simulate SOS notification animation
      setTimeout(() => {
        setSosActive(false)
      }, 3000)
    } catch (error) {
      toast.error('Failed to send SOS')
      setSosActive(false)
    } finally {
      setSending(false)
    }
  }

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error('Please fill in all fields')
      return
    }

    setContacts([...contacts, {
      id: Date.now(),
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation || 'Contact'
    }])

    setNewContact({ name: '', phone: '', relation: '' })
    setShowAddContact(false)
    toast.success('Contact added!')
  }

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id))
    toast.success('Contact removed')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-slate-50 to-white dark:from-slate-950 dark:via-red-950/20 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-red-200 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-200 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold">Emergency Response</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-red-600 dark:text-red-400">One-Tap SOS</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Instantly alert your emergency contacts with your location. Get help when you need it most.
          </p>
        </motion.div>

        {/* Main SOS Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <motion.button
            onClick={triggerSOS}
            disabled={sending || sosActive}
            whileHover={!sosActive && !sending ? { scale: 1.05 } : {}}
            whileTap={!sosActive && !sending ? { scale: 0.95 } : {}}
            animate={sosActive ? { scale: [1, 1.1, 1] } : {}}
            transition={sosActive ? { duration: 0.8, repeat: Infinity } : {}}
            className={`relative w-48 h-48 rounded-full font-bold text-white text-2xl font-bold transition-all shadow-2xl ${
              sosActive
                ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/50'
                : 'bg-gradient-to-br from-red-500 to-red-700 hover:shadow-red-500/50'
            }`}
          >
            {sosActive ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader className="w-10 h-10 animate-spin mb-2" />
                <span className="text-sm">Sending...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <AlertCircle className="w-10 h-10 mb-2" />
                <span>SOS</span>
              </div>
            )}

            {/* Pulse Ring Animation */}
            {sosActive && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-red-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-red-500 opacity-70"
                />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Location Info */}
        {location && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Location Detected</p>
                <p className="text-sm text-slate-600">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Emergency Contacts</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddContact(true)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
            </motion.button>
          </div>

          {/* Add Contact Form */}
          {showAddContact && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Contact name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1-234-567-8900"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Relation</label>
                  <input
                    type="text"
                    placeholder="e.g., Mom, Doctor, Friend"
                    value={newContact.relation}
                    onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addContact}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Add Contact
                  </button>
                  <button
                    onClick={() => {
                      setShowAddContact(false)
                      setNewContact({ name: '', phone: '', relation: '' })
                    }}
                    className="flex-1 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contacts List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact, idx) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{contact.name}</h3>
                    <p className="text-sm text-slate-600">{contact.relation}</p>
                  </div>
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="text-red-500" size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={18} />
                  <a href={`tel:${contact.phone}`} className="font-semibold hover:text-blue-600">
                    {contact.phone}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-semibold">No emergency contacts yet</p>
              <p className="text-sm text-slate-500">Add contacts to enable SOS notifications</p>
            </div>
          )}
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="p-6 bg-red-50 rounded-xl border border-red-200">
            <AlertCircle className="text-red-600 mb-3" size={24} />
            <h3 className="font-bold text-red-900 mb-2">How It Works</h3>
            <ul className="text-sm text-red-800 space-y-2">
              <li>✓ Press the SOS button to send alerts</li>
              <li>✓ Your location is shared automatically</li>
              <li>✓ SMS & email sent to all contacts</li>
              <li>✓ Emergency services are notified</li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <AlertCircle className="text-blue-600 mb-3" size={24} />
            <h3 className="font-bold text-blue-900 mb-2">Important Notes</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ Always verify your location is shared</li>
              <li>✓ Keep emergency contacts updated</li>
              <li>✓ SOS is 24/7 active</li>
              <li>✓ Call 911 in life-threatening emergencies</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
