import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Calendar, AlertCircle, Droplets, Users, Shield, Check } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: 'AI Diagnostics',
      description: 'Upload images for instant health analysis',
      link: '/health-check',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Book doctor visits in seconds',
      link: '/appointments',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: AlertCircle,
      title: 'SOS Emergency',
      description: 'One-tap emergency assistance',
      link: '/emergency',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Droplets,
      title: 'Blood Donation',
      description: 'Connect donors when needed',
      link: '/blood-donation',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Health Checks' },
    { value: '1,200+', label: 'Registered Doctors' },
    { value: '98%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full">
                Trusted Healthcare Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Your Health,{' '}
              <span className="gradient-text">Connected & Protected</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              AI-powered health diagnostics, instant emergency response, and seamless doctor
              appointments — all in one platform designed for modern healthcare.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/health-check"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Start Health Check
              </Link>
              <Link
                to="/appointments"
                className="px-8 py-4 border-2 border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 dark:bg-slate-900 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={feature.link}>
                  <div className="h-full p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-600 shadow-sm hover:shadow-lg transition-all cursor-pointer">
                    <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose MediConnect?</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Industry-leading healthcare platform trusted by thousands</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Shield, title: 'Secure & Private', desc: 'HIPAA compliant with end-to-end encryption' },
            { icon: Users, title: 'Expert Doctors', desc: 'Verified medical professionals available 24/7' },
            { icon: Zap, title: 'AI-Powered', desc: 'Advanced ML models for accurate diagnostics' }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                variants={item}
                className="p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-center hover:border-blue-300 dark:hover:border-cyan-600 transition-colors"
              >
                <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-600 dark:via-blue-600 dark:to-purple-700 rounded-3xl p-12 sm:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Healthcare?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users managing their health better with MediConnect
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Get Started Free
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">About</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Support</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Admin</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/admin-login" className="hover:text-blue-600 dark:hover:text-cyan-400">Admin Portal</Link></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Camp Management</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Terms</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Follow</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-cyan-400">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; 2024 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
