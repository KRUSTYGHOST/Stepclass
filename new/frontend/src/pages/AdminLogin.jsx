import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Heart, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // Simulate admin login
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Store admin session
      localStorage.setItem('adminToken', 'admin_' + Date.now())
      toast.success('Admin login successful!')
      navigate('/admin-dashboard')
    } catch (error) {
      toast.error('Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-slate-50 to-white dark:from-slate-950 dark:via-red-950/20 dark:to-slate-900 flex items-center justify-center px-4 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-red-200 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2.5 rounded-lg group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">MediConnect</span>
          </Link>

          {/* Admin Badge */}
          <div className="inline-flex items-center justify-center w-full mb-6">
            <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold">
              Admin Portal
            </span>
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">Admin Login</h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Blood Donation Camp Management</p>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={20} />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 text-red-500 dark:text-red-400" />
                <span className="text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Logging in...' : 'Admin Login'}
            </motion.button>
          </form>

          {/* Back to User Login */}
          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            Not an admin?{' '}
            <Link to="/login" className="text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors">
              User login
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 transition-colors">
            <p className="text-xs font-semibold text-red-900 dark:text-red-300 mb-2">Demo Credentials:</p>
            <p className="text-xs text-red-800 dark:text-red-400">
              <span className="font-mono">admin@mediconnect.com</span> / <span className="font-mono">admin123</span>
            </p>
          </div>

          {/* Admin Features */}
          <div className="mt-8 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-6">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Shield size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <span>Manage Blood Donation Camps</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Shield size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <span>View Blood Requests & Analytics</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Shield size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <span>Send Alerts to Donors</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
