import { useState } from 'react'
import { Droplets, MapPin, Clock, Users } from 'lucide-react'

// Sample blood donation camps data
const bloodDonationCamps = [
  {
    id: 1,
    name: 'Apollo Hospitals Blood Bank',
    lat: 13.0895,
    lng: 80.2739,
    status: 'Active',
    bloodGroups: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    time: '9:00 AM - 6:00 PM',
    address: 'Greams Road, Chennai, Tamil Nadu',
    phone: '+91-44-2829-3333',
    collected: 45,
  },
  {
    id: 2,
    name: 'Red Cross Blood Bank Chennai',
    lat: 13.0872,
    lng: 80.2752,
    status: 'Active',
    bloodGroups: ['O+', 'A+', 'B+', 'AB+'],
    time: '10:00 AM - 5:00 PM',
    address: 'Nungambakkam, Chennai, Tamil Nadu',
    phone: '+91-44-2825-4141',
    collected: 32,
  },
  {
    id: 3,
    name: 'Fortis Malar Blood Donation Center',
    lat: 13.0915,
    lng: 80.2785,
    status: 'Active',
    bloodGroups: ['O+', 'O-', 'A+', 'B+'],
    time: '8:00 AM - 4:00 PM',
    address: 'Adyar, Chennai, Tamil Nadu',
    phone: '+91-44-4273-5000',
    collected: 28,
  },
  {
    id: 4,
    name: 'St. Isabels Hospital Blood Bank',
    lat: 13.0850,
    lng: 80.2710,
    status: 'Active',
    bloodGroups: ['All Groups'],
    time: '9:30 AM - 5:30 PM',
    address: 'Mylapore, Chennai, Tamil Nadu',
    phone: '+91-44-2499-5000',
    collected: 56,
  },
  {
    id: 5,
    name: 'Sri Ramachandra Blood Center',
    lat: 13.0925,
    lng: 80.2820,
    status: 'Active',
    bloodGroups: ['O+', 'A+', 'AB+'],
    time: '10:00 AM - 6:00 PM',
    address: 'Porur, Chennai, Tamil Nadu',
    phone: '+91-44-4760-1000',
    collected: 19,
  },
]

export default function BloodDonationMap() {
  const [selectedCamp, setSelectedCamp] = useState(null)

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Active Donation Camps</h2>
        <p className="text-slate-600 dark:text-slate-400">Find and visit blood donation centers near you</p>
      </div>

      {/* Map Container */}
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg mb-8" style={{ height: '400px' }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3888.5939299789424!2d80.2739!3d13.0895!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f7c8f4f4f4f%3A0x0!2sChennai%20Blood%20Donation%20Centers!5e0!3m2!1sen!2sin!4v1234567890"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Camps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bloodDonationCamps.map((camp) => (
          <div
            key={camp.id}
            onClick={() => setSelectedCamp(camp)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedCamp?.id === camp.id
                ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-red-300 dark:hover:border-red-600'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{camp.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {camp.address}
                </p>
              </div>
              <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs font-semibold">
                {camp.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock size={14} />
                <span>{camp.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Users size={14} />
                <span>{camp.collected} units</span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Blood Groups Needed:</p>
              <div className="flex flex-wrap gap-1">
                {camp.bloodGroups.map((bg, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold"
                  >
                    {bg}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
              Donate Now
            </button>
          </div>
        ))}
      </div>

      {/* Donor Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
          <Droplets className="text-red-600 dark:text-red-400 mb-2" size={24} />
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">{bloodDonationCamps.reduce((sum, c) => sum + c.collected, 0)}</p>
          <p className="text-sm text-red-600 dark:text-red-400">Units Collected</p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <MapPin className="text-blue-600 dark:text-blue-400 mb-2" size={24} />
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{bloodDonationCamps.length}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">Active Camps</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
          <Users className="text-green-600 dark:text-green-400 mb-2" size={24} />
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">{Math.floor(bloodDonationCamps.reduce((sum, c) => sum + c.collected, 0) * 2.5)}</p>
          <p className="text-sm text-green-600 dark:text-green-400">Lives Saved</p>
        </div>
      </div>
    </div>
  )
}
