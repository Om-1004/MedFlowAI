import React, { useState, useRef } from "react";
import { Upload, Brain, CheckCircle, FileText, AlertCircle, XCircle } from "lucide-react";

export default function PredictCnn() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const CLASS_LABELS = ["Glioma", "Meningioma", "No Tumor", "Pituitary"];

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setPrediction(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ML_SERVICE_URL}/predict_cnn`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
   
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(droppedFile);
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: '#faf5ff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-sm border-l-4 mb-6 p-6 rounded-r-lg" style={{ borderLeftColor: '#a855f7' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#f3e8ff' }}>
              <Brain className="w-6 h-6" style={{ color: '#a855f7' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brain Tumor Detection</h1>
              <p className="text-sm text-gray-600 mt-0.5">AI-powered MRI scan analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4" style={{ backgroundColor: '#a855f7' }}>
            <h2 className="text-lg font-semibold text-white">MRI Image Analysis</h2>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-8" style={{ backgroundColor: '#a855f7' }}></div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Upload MRI Scan
                </h3>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer"
                style={{
                  borderColor: dragActive ? '#a855f7' : file ? '#86efac' : '#d1d5db',
                  backgroundColor: dragActive ? '#f3e8ff' : file ? '#dcfce7' : '#f9fafb'
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleFileSelect}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
               
                <div className="flex flex-col items-center">
                  {file ? (
                    <>
                      <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                      <p className="text-sm font-semibold text-green-600 mb-1">{file.name}</p>
                      <p className="text-xs text-gray-500">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-sm font-semibold text-gray-700 mb-1">Drag and drop your MRI image</p>
                      <p className="text-xs text-gray-500">or click to select a file</p>
                    </>
                  )}
                </div>
              </div>
             
              <p className="text-xs text-gray-500 mt-2 text-center">
                Supported formats: JPG, PNG, DICOM • Max size: 10MB
              </p>
            </div>

            {preview && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-0.5 w-8" style={{ backgroundColor: '#a855f7' }}></div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Image Preview
                  </h3>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 flex justify-center">
                  <img src={preview} alt="Preview" className="max-h-64 rounded-lg" />
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-8" style={{ backgroundColor: '#a855f7' }}></div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Image Requirements
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a855f7' }}></div>
                  <span className="text-sm text-gray-700">High-quality MRI brain scan</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a855f7' }}></div>
                  <span className="text-sm text-gray-700">Clear brain structure visibility</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a855f7' }}></div>
                  <span className="text-sm text-gray-700">Minimal noise and artifacts</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a855f7' }}></div>
                  <span className="text-sm text-gray-700">Standard radiological orientation</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-full text-white font-semibold py-4 px-6 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: loading ? '#a855f7' : '#9333ea' }}
                onMouseEnter={(e) => !loading && !e.currentTarget.disabled && (e.target.style.backgroundColor = '#7e22ce')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#9333ea')}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing MRI Scan...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          {prediction && (
            <div className="border-t-4 p-8" style={{ borderTopColor: '#f3e8ff', backgroundColor: '#faf5ff' }}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#f3e8ff' }}>
                    <CheckCircle className="w-6 h-6" style={{ color: '#a855f7' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Analysis Complete</h3>
                    <p className="text-sm text-gray-600">MRI scan processed successfully</p>
                  </div>
                </div>
                
                <div className="bg-white border-2 rounded-lg p-6 shadow-sm mb-5" style={{ borderColor: '#f3e8ff' }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a855f7' }}>
                    Tumor Classification
                  </div>
                  <div className="text-3xl font-bold mb-3" style={{ color: '#9333ea' }}>
                    {CLASS_LABELS[prediction.predicted_class]}
                  </div>
                  <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
                    <span className="font-semibold">Confidence Distribution:</span>
                    <div className="mt-3 space-y-2">
                      {CLASS_LABELS.map((label, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-xs font-medium text-gray-600 w-24">{label}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(prediction.raw_output[0][idx] * 100).toFixed(1)}%`,
                                backgroundColor: '#a855f7'
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 w-12 text-right">
                            {(prediction.raw_output[0][idx] * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-l-4 p-4 rounded-r-lg" style={{ backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b' }}>
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#d97706' }} />
                  <p className="text-sm" style={{ color: '#92400e' }}>
                    <strong>Medical Disclaimer:</strong> This AI analysis is for research and educational purposes only. Results should be reviewed by qualified radiologists and medical professionals. Not intended for clinical diagnosis or treatment decisions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">Powered by Convolutional Neural Network Technology</p>
        </div>
      </div>
    </div>
  );
}