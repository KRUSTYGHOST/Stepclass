import { useState } from 'react'
import { Shield, Plus, X, Phone, Mail, MapPin, Send, AlertTriangle, CheckCircle } from 'lucide-react'

export default function SOSEmergency() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+1234567890', email: 'john@example.com', relation: 'Family' },
    { id: 2, name: 'Jane Smith', phone: '+0987654321', email: 'jane@example.com', relation: 'Friend' },
  ])
  const [showAddContact, setShowAddContact] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relation: 'Family',
  })

  const handleAddContact = () => {
    if (newContact.name && (newContact.phone || newContact.email)) {
      setContacts([...contacts, { ...newContact, id: Date.now() }])
      setNewContact({ name: '', phone: '', email: '', relation: 'Family' })
      setShowAddContact(false)
    }
  }

  const handleRemoveContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleSOS = async () => {
    if (contacts.length === 0) {
      alert('Please add at least one emergency contact')
      return
    }

    setIsSending(true)
    setSent(false)

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          mapUrl: `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
        }

        // Simulate sending SOS - Replace with actual API call
        setTimeout(() => {
          setIsSending(false)
          setSent(true)
          setTimeout(() => setSent(false), 5000)
        }, 2000)
      },
      (error) => {
        alert('Unable to get location. Please enable location services.')
        setIsSending(false)
      }
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
          <Shield className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          SOS Emergency
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          One-tap emergency alerts with GPS location sent to your emergency contacts
        </p>
      </div>

      {/* SOS Button */}
      <div className="card mb-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4 shadow-lg">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Emergency SOS</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Tap the button below to send your location and emergency alert to all contacts
            </p>
          </div>
          
          <button
            onClick={handleSOS}
            disabled={isSending || contacts.length === 0}
            className={`w-full py-6 px-8 rounded-xl font-bold text-xl text-white shadow-xl transform transition-all duration-200 ${
              isSending || sent
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-105 active:scale-95'
            }`}
          >
            {isSending ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending SOS...</span>
              </span>
            ) : sent ? (
              <span className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span>SOS Sent Successfully!</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Shield className="h-6 w-6" />
                <span>ACTIVATE SOS</span>
              </span>
            )}
          </button>

          {sent && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <CheckCircle className="h-4 w-4 inline mr-2" />
                Emergency alerts sent to {contacts.length} contact(s) with your GPS location
              </p>
            </div>
          )}

          {contacts.length === 0 && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm flex items-center">
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                Please add at least one emergency contact below
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Emergency Contacts</h2>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddContact && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Add New Emergency Contact</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="input-field"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Relation
                </label>
                <select
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="input-field"
                >
                  <option>Family</option>
                  <option>Friend</option>
                  <option>Colleague</option>
                  <option>Doctor</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="input-field"
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="input-field"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowAddContact(false)
                  setNewContact({ name: '', phone: '', email: '', relation: 'Family' })
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleAddContact} className="btn-primary">
                Add Contact
              </button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p>No emergency contacts added yet</p>
            <p className="text-sm mt-2">Click "Add Contact" to get started</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{contact.name}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-600 px-2 py-1 rounded">
                      {contact.relation}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {contact.phone && (
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>How SOS Works</span>
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            When you activate SOS, your GPS location is automatically captured
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Emergency alerts are sent via SMS and Email to all your contacts
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Each alert includes a Google Maps link to your exact location
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Make sure location services are enabled on your device
          </li>
        </ul>
      </div>
    </div>
  )
}
