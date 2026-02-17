import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Check, AlertCircle, Camera, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HealthCheck() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      toast.error('Unable to access camera')
    }
  }

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.drawImage(videoRef.current, 0, 0)
      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
        setImage(file)
        setPreview(canvasRef.current.toDataURL())
        stopCamera()
      })
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  const analyzeImage = async () => {
    if (!image) {
      toast.error('Please select an image first')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api/health/predict', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setResult(data)
      toast.success('Analysis complete!')
    } catch (error) {
      toast.error('Failed to analyze image')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setCameraActive(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">AI Health Diagnostics</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Upload or capture an image to get an instant AI-powered health analysis. Our advanced ML models analyze skin conditions, eye issues, and more.
          </p>
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left - Upload Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Upload Image</h2>

              {!preview ? (
                <div className="space-y-4">
                  {/* File Upload Area */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-blue-300 dark:border-cyan-600 rounded-xl p-8 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-center"
                  >
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="font-semibold text-slate-900 mb-1">Click to upload</p>
                    <p className="text-sm text-slate-600">or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </motion.div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-600">or</span>
                    </div>
                  </div>

                  {/* Camera Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startCamera}
                    className="w-full py-3 border-2 border-slate-300 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <Camera size={20} />
                    Take a Photo
                  </motion.button>
                </div>
              ) : (
                <div>
                  {/* Preview Image */}
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="relative rounded-xl overflow-hidden mb-4 bg-slate-100 h-64 flex items-center justify-center"
                  >
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <button
                    onClick={resetForm}
                    className="w-full py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              )}

              {/* Info Cards */}
              <div className="mt-8 space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Privacy First</p>
                      <p className="text-xs text-blue-700">Images are not stored permanently</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <div className="flex gap-3">
                    <AlertCircle className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-cyan-900 text-sm">Not a Diagnosis</p>
                      <p className="text-xs text-cyan-700">Always consult a doctor for medical advice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Results Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>

              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col items-center justify-center h-96"
                >
                  <Loader className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="text-slate-600 font-semibold">Analyzing image...</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Prediction Card */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-full">
                        <Check className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Detected Condition</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{result.prediction}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Confidence</span>
                        <span className="text-sm font-bold text-blue-600">{(result.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence * 100}%` }}
                          transition={{ duration: 1.5 }}
                          className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Card */}
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-sm text-slate-600 font-medium mb-2">Recommendation</p>
                    <p className="text-lg text-slate-900 font-semibold">{result.recommendation}</p>
                  </div>

                  {/* Severity Badge */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-600 font-medium mb-2">Severity Level</p>
                    <div className="flex gap-2">
                      <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        result.severity === 'mild' ? 'bg-green-100 text-green-700' :
                        result.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                      onClick={resetForm}
                      className="py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                    >
                      New Analysis
                    </button>
                    <a
                      href="/appointments"
                      className="py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-center"
                    >
                      Book Doctor
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300">
                  <Upload className="w-12 h-12 text-slate-400 mb-4" />
                  <p className="text-slate-600 font-semibold">Upload an image to analyze</p>
                </div>
              )}

              {/* Analyze Button */}
              {preview && !result && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={analyzeImage}
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Camera Modal */}
        {cameraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          >
            <div className="max-w-2xl w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg mb-4"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="flex-1 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
