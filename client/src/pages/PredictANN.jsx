import React, { useState } from 'react';
import { Activity, User, FileText, Beaker } from 'lucide-react';

export default function CancerModel() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    cancerType: '',
    cancerStage: '',
    tumorSize: '',
    wbc: '',
    rbc: '',
    platelet: '',
    hemoglobin: '',
    psa: '',
    ca125: '',
    cea: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Risk assessment calculation initiated!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cancer Risk Assessment</h1>
          <p className="text-gray-600">Provide your medical information for comprehensive cancer risk analysis</p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cancer Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">Cancer Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cancer Type</label>
                <select
                  name="cancerType"
                  value={formData.cancerType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">Select Cancer Type</option>
                  <option value="breast">Breast Cancer</option>
                  <option value="lung">Lung Cancer</option>
                  <option value="prostate">Prostate Cancer</option>
                  <option value="colorectal">Colorectal Cancer</option>
                  <option value="ovarian">Ovarian Cancer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tumor Size (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  name="tumorSize"
                  value={formData.tumorSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cancer Stage</label>
                <select
                  name="cancerStage"
                  value={formData.cancerStage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">Select Cancer Stage</option>
                  <option value="stage0">Stage 0</option>
                  <option value="stage1">Stage I</option>
                  <option value="stage2">Stage II</option>
                  <option value="stage3">Stage III</option>
                  <option value="stage4">Stage IV</option>
                </select>
              </div>
            </div>
          </div>

          {/* Laboratory Results Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Beaker className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">Laboratory Results</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  White Blood Cell Count (cells/μL)
                </label>
                <input
                  type="number"
                  name="wbc"
                  value={formData.wbc}
                  onChange={handleInputChange}
                  placeholder="e.g., 7000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Red Blood Cell Count (million cells/μL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="rbc"
                  value={formData.rbc}
                  onChange={handleInputChange}
                  placeholder="e.g., 4.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platelet Count (cells/μL)
                </label>
                <input
                  type="number"
                  name="platelet"
                  value={formData.platelet}
                  onChange={handleInputChange}
                  placeholder="e.g., 250000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hemoglobin Level (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="hemoglobin"
                  value={formData.hemoglobin}
                  onChange={handleInputChange}
                  placeholder="e.g., 14.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tumor Markers Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tumor Markers (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PSA (ng/mL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="psa"
                  value={formData.psa}
                  onChange={handleInputChange}
                  placeholder="if applicable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CA-125 (U/mL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="ca125"
                  value={formData.ca125}
                  onChange={handleInputChange}
                  placeholder="if applicable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CEA (ng/mL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="cea"
                  value={formData.cea}
                  onChange={handleInputChange}
                  placeholder="if applicable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
            >
              Calculate Risk Score
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}