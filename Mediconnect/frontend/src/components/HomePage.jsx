import { Link } from 'react-router-dom'
import { Activity, Shield, Calendar, Mail, ArrowRight, Heart, Stethoscope } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Activity,
      title: 'AI Disease Detection',
      description: 'Upload images to get instant AI-powered disease predictions and recommendations',
      link: '/disease-detection',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'SOS Emergency',
      description: 'One-tap emergency alerts with GPS location sent to your emergency contacts',
      link: '/sos',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Calendar,
      title: 'Doctor Appointments',
      description: 'Book appointments with doctors easily through our calendar system',
      link: '/appointments',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Mail,
      title: 'Blood Donation Alerts',
      description: 'Admin can send mass notifications for urgent blood donation needs',
      link: '/admin/mailer',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-6">
          <Stethoscope className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to MediConnect
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Your comprehensive healthcare companion powered by AI. Get instant medical insights, 
          emergency support, and seamless appointment booking all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/disease-detection"
            className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/appointments"
            className="btn-secondary flex items-center space-x-2 text-lg px-8 py-3"
          >
            <Calendar className="h-5 w-5" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Link
              key={index}
              to={feature.link}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white mb-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
            <div className="text-blue-100">Active Users</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Doctors Available</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Emergency Support</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Heart className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4 dark:text-gray-100">Need Immediate Help?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          Use our SOS Emergency feature to instantly alert your emergency contacts with your location
        </p>
        <Link
          to="/sos"
          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
        >
          <Shield className="h-6 w-6" />
          <span>Activate SOS</span>
        </Link>
      </div>
    </div>
  )
}
