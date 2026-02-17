import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Send, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setSending(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: 'SRM Institute of Science and Technology (SRMIST), Kattankulathur, Chengalpattu District, Tamil Nadu 603203, India',
      color: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91-44-2748-5000',
      subDetails: '+91-9876-543-210 (Emergency Hotline)',
      color: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'mediconnect@srmist.edu.in',
      subDetails: 'support@mediconnect.health',
      color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM',
      subDetails: 'Emergency: 24/7 Available',
      color: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Contact Us</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with our team and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl border border-slate-200 dark:border-slate-700 ${info.color} bg-white dark:bg-slate-800`}
              >
                <div className="mb-4">
                  <Icon size={32} className="mb-3" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{info.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">{info.details}</p>
                {info.subDetails && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{info.subDetails}</p>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-9876-543-210"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="5"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* SRMIST Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* SRMIST Details */}
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 to-cyan-50 dark:to-cyan-950/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">SRM Institute of Science and Technology</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Campus Location</p>
                    <p className="text-slate-700 dark:text-slate-300">
                      Kattankulathur, Chengalpattu District<br />
                      Tamil Nadu 603203, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Main Phone</p>
                    <p className="text-slate-700 dark:text-slate-300">+91-44-2748-5000</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Hours of Operation</p>
                    <p className="text-slate-700 dark:text-slate-300">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      24/7 Emergency Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Info */}
            <div className="bg-gradient-to-br from-green-50 dark:from-green-950/30 to-emerald-50 dark:to-emerald-950/30 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Response Time</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300">General inquiries: 24-48 hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300">Emergency requests: Immediate</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300">Phone support: Available 24/7</span>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl p-8 h-64 flex items-center justify-center border border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400 font-semibold">
                  SRMIST Kattankulathur Campus, Chennai
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  Latitude: 12.8214 | Longitude: 80.0358
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
