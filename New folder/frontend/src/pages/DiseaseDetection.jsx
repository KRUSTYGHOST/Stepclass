import React, { useState } from 'react'
import api from '../utils/api'

const DiseaseDetection = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setPrediction(null)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post('/api/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setPrediction(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error processing image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '100px', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>🔬 Disease Detection</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Upload Image</h2>
            {error && <div className="error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Image (Skin, Eye, etc.)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              {preview && (
                <div style={{ marginBottom: '1rem' }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', borderRadius: '0.5rem', marginBottom: '1rem' }}
                  />
                </div>
              )}
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !file}
                style={{ width: '100%' }}
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </form>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Prediction Results</h2>
            {prediction ? (
              <div>
                <div style={{
                  background: 'var(--bg-light)',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                    {prediction.predicted_disease}
                  </h3>
                  <p style={{ color: 'var(--text-light)' }}>
                    Confidence: <strong>{(prediction.confidence * 100).toFixed(1)}%</strong>
                  </p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Recommendation:</h4>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                    {prediction.recommendation}
                  </p>
                </div>
                {prediction.image_url && (
                  <img
                    src={`http://localhost:8000${prediction.image_url}`}
                    alt="Analyzed"
                    style={{ maxWidth: '100%', borderRadius: '0.5rem', marginTop: '1rem' }}
                  />
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
                Upload an image to get started
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiseaseDetection
