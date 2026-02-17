import { useState, useRef } from 'react'
import { Upload, Camera, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [showCamera, setShowCamera] = useState(false)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setPrediction(null)
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (error) {
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' })
        setSelectedImage(file)
        setPreview(canvas.toDataURL())
        stopCamera()
      })
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      setShowCamera(false)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setPreview(null)
    setPrediction(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setPrediction(null)

    // Simulate API call - Replace with actual backend call
    setTimeout(() => {
      // Mock prediction results
      const mockPredictions = [
        {
          condition: 'Acne',
          confidence: 0.87,
          severity: 'Moderate',
          recommendation: 'Consider using a gentle cleanser and topical treatment. Consult a dermatologist if condition persists.',
        },
        {
          condition: 'Rash',
          confidence: 0.72,
          severity: 'Mild',
          recommendation: 'Apply a cool compress and avoid irritants. Monitor for changes.',
        },
        {
          condition: 'Conjunctivitis',
          confidence: 0.65,
          severity: 'Mild',
          recommendation: 'Keep eyes clean and avoid touching. Consult an ophthalmologist if symptoms worsen.',
        },
      ]

      const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)]
      setPrediction(randomPrediction)
      setIsAnalyzing(false)
    }, 2000)
  }

  const conditions = [
    { name: 'Skin Conditions', examples: 'Acne, Rashes, Eczema, Psoriasis' },
    { name: 'Eye Conditions', examples: 'Conjunctivitis, Styes, Eye Infections' },
    { name: 'Wound Assessment', examples: 'Cuts, Burns, Infections' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          AI Disease Detection
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Upload or capture an image to get instant AI-powered analysis and recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Upload Image</h2>
          
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Drag and drop an image here, or</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleImageUpload}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Upload className="h-5 w-5" />
                      <span>Choose File</span>
                    </button>
                    <button
                      onClick={startCamera}
                      className="btn-secondary inline-flex items-center space-x-2"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Use Camera</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Supported formats: JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <button
                onClick={removeImage}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {preview && (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full mt-6 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          )}

          {/* Camera Modal */}
          {showCamera && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
                <div className="relative mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={capturePhoto}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Analysis Results</h2>
          
          {!prediction && !isAnalyzing && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>Upload an image to get started with AI analysis</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary-600 dark:text-primary-400 animate-spin" />
              <p className="text-gray-600 dark:text-gray-300">Analyzing image with AI models...</p>
            </div>
          )}

          {prediction && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-l-4 border-primary-600">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {prediction.condition}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Confidence:</span>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Severity:</span>
                        <span className={`font-semibold ${
                          prediction.severity === 'Mild' ? 'text-green-600' :
                          prediction.severity === 'Moderate' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {prediction.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Recommendation</span>
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{prediction.recommendation}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> This is an AI-powered prediction and should not replace 
                  professional medical advice. Please consult a healthcare provider for accurate diagnosis.
                </p>
              </div>
            </div>
          )}

          {/* Supported Conditions */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Supported Conditions</h3>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{condition.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{condition.examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
