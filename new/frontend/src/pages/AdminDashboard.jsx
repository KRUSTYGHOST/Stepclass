import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Plus, Edit, Trash2, MapPin, Phone, Users, Activity, TrendingUp, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [camps, setCamps] = useState([
    {
      id: 1,
      name: 'Apollo Hospitals Blood Bank',
      location: 'Greams Road, Chennai',
      phone: '+91-44-2829-3333',
      bloodGroups: ['O+', 'O-', 'A+', 'A-'],
      unitsCollected: 45,
      status: 'active'
    },
    {
      id: 2,
      name: 'Red Cross Blood Bank Chennai',
      location: 'Nungambakkam, Chennai',
      phone: '+91-44-2825-4141',
      bloodGroups: ['B+', 'B-', 'AB+'],
      unitsCollected: 32,
      status: 'active'
    },
    {
      id: 3,
      name: 'Fortis Malar Blood Donation Center',
      location: 'Adyar, Chennai',
      phone: '+91-44-4273-5000',
      bloodGroups: ['O+', 'A+', 'B+', 'AB+'],
      unitsCollected: 28,
      status: 'active'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    bloodGroups: []
  })

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    toast.success('Logged out successfully')
    navigate('/')
  }

  const handleAddCamp = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.location || !formData.phone) {
      toast.error('Please fill in all fields')
      return
    }

    const newCamp = {
      id: camps.length + 1,
      ...formData,
      unitsCollected: 0,
      status: 'active'
    }

    setCamps([...camps, newCamp])
    toast.success('Blood camp added successfully!')
    setFormData({ name: '', location: '', phone: '', bloodGroups: [] })
    setShowForm(false)
  }

  const handleDeleteCamp = (id) => {
    setCamps(camps.filter(camp => camp.id !== id))
    toast.success('Camp deleted successfully')
  }

  const totalUnits = camps.reduce((sum, camp) => sum + camp.unitsCollected, 0)
  const activeCamps = camps.filter(c => c.status === 'active').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-slate-50 to-white dark:from-slate-950 dark:via-red-950/20 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-red-200 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">Admin Dashboard</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Blood Donation Camp Management</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Active Camps', value: activeCamps, icon: MapPin, color: 'from-red-400 to-red-600' },
            { label: 'Total Blood Units', value: totalUnits, icon: TrendingUp, color: 'from-pink-400 to-pink-600' },
            { label: 'Donor Requests', value: '12', icon: AlertCircle, color: 'from-orange-400 to-orange-600' },
            { label: 'Total Donors', value: '2,450', icon: Users, color: 'from-purple-400 to-purple-600' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</p>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Camp Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Camp
          </button>
        </motion.div>

        {/* Add Camp Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-12 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add New Blood Donation Camp</h2>
            <form onSubmit={handleAddCamp} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Camp Name</label>
                <input
                  type="text"
                  placeholder="Hospital/Organization Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+91-XXXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Blood Groups Available</label>
                <input
                  type="text"
                  placeholder="O+, A+, B+, AB+ (comma separated)"
                  value={formData.bloodGroups.join(', ')}
                  onChange={(e) => setFormData({ ...formData, bloodGroups: e.target.value.split(',').map(b => b.trim()) })}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Create Camp
              </button>
            </form>
          </motion.div>
        )}

        {/* Camps List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Blood Donation Camps</h2>
          <div className="grid gap-6">
            {camps.map((camp, idx) => (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{camp.name}</h3>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-red-600 dark:text-red-400" />
                        {camp.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="text-red-600 dark:text-red-400" />
                        {camp.phone}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {camp.bloodGroups.map((bg) => (
                        <span
                          key={bg}
                          className="px-3 py-1 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold"
                        >
                          {bg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                    <div className="text-right">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Units Collected</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">{camp.unitsCollected}</p>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-950/50 transition-all"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteCamp(camp.id)}
                        className="p-3 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-950/50 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
