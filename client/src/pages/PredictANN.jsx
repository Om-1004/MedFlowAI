import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

export default function PredictANN() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    Age: 51,
    Year: 2023,
    Genetic_Risk: 3.9,
    Air_Pollution: 9.8,
    Alcohol_Use: 0.6,
    Smoking: 0.5,
    Obesity_Level: 4.5,
    Treatment_Cost_USD: 37362.43,
    Survival_Years: 0.5,
    gender: 'Female',
    country: 'Russia',
    cancerType: 'Prostate',
    cancerStage: 'Stage_IV'
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      Age: parseFloat(form.Age),
      Year: parseInt(form.Year),
      Genetic_Risk: parseFloat(form.Genetic_Risk),
      Air_Pollution: parseFloat(form.Air_Pollution),
      Alcohol_Use: parseFloat(form.Alcohol_Use),
      Smoking: parseFloat(form.Smoking),
      Obesity_Level: parseFloat(form.Obesity_Level),
      Treatment_Cost_USD: parseFloat(form.Treatment_Cost_USD),
      Survival_Years: parseFloat(form.Survival_Years),
      
      Gender_Female: form.gender === 'Female',
      Gender_Male: form.gender === 'Male',
      Gender_Other: form.gender === 'Other',
      
      Country_Region_Brazil: form.country === 'Brazil',
      Country_Region_Canada: form.country === 'Canada',
      Country_Region_China: form.country === 'China',
      Country_Region_Germany: form.country === 'Germany',
      Country_Region_India: form.country === 'India',
      Country_Region_Pakistan: form.country === 'Pakistan',
      Country_Region_Russia: form.country === 'Russia',
      Country_Region_UK: form.country === 'UK',
      Country_Region_USA: form.country === 'USA',
      
      Cancer_Type_Cervical: form.cancerType === 'Cervical',
      Cancer_Type_Colon: form.cancerType === 'Colon',
      Cancer_Type_Leukemia: form.cancerType === 'Leukemia',
      Cancer_Type_Liver: form.cancerType === 'Liver',
      Cancer_Type_Lung: form.cancerType === 'Lung',
      Cancer_Type_Prostate: form.cancerType === 'Prostate',
      Cancer_Type_Skin: form.cancerType === 'Skin',
      
      Cancer_Stage_Stage_I: form.cancerStage === 'Stage_I',
      Cancer_Stage_Stage_II: form.cancerStage === 'Stage_II',
      Cancer_Stage_Stage_III: form.cancerStage === 'Stage_III',
      Cancer_Stage_Stage_IV: form.cancerStage === 'Stage_IV'
    };

    try {
      const response = await fetch(`${API_BASE_URL}/predict-ann`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.detail || 'Prediction failed');
      }
    } catch (err) {
      setError(`Error: ${err.message}. Make sure your API is running at ${API_BASE_URL}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Cancer Severity Predictor</h1>
                <p className="text-blue-100 text-sm mt-1">ANN Model - Predict cancer severity score</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                Patient Demographics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={form.Age}
                    onChange={(e) => handleChange('Age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={form.Year}
                    onChange={(e) => handleChange('Year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="2000"
                    max="2030"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                Risk Factors (0-1 scale)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Genetic_Risk', 'Air_Pollution', 'Alcohol_Use', 'Smoking', 'Obesity_Level'].map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.replace(/_/g, ' ')}
                    </label>
                    <input
                      type="number"
                      value={form[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      step="0.1"
                      min="0"
                      max="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
                Cancer Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cancer Type</label>
                  <select
                    value={form.cancerType}
                    onChange={(e) => handleChange('cancerType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Cervical">Cervical</option>
                    <option value="Colon">Colon</option>
                    <option value="Leukemia">Leukemia</option>
                    <option value="Liver">Liver</option>
                    <option value="Lung">Lung</option>
                    <option value="Prostate">Prostate</option>
                    <option value="Skin">Skin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cancer Stage</label>
                  <select
                    value={form.cancerStage}
                    onChange={(e) => handleChange('cancerStage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Stage_I">Stage I</option>
                    <option value="Stage_II">Stage II</option>
                    <option value="Stage_III">Stage III</option>
                    <option value="Stage_IV">Stage IV</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                  <select
                    value={form.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="China">China</option>
                    <option value="Germany">Germany</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Russia">Russia</option>
                    <option value="UK">UK</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">5</span>
                Treatment & Outcome
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Cost (USD)</label>
                  <input
                    type="number"
                    value={form.Treatment_Cost_USD}
                    onChange={(e) => handleChange('Treatment_Cost_USD', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Survival Years</label>
                  <input
                    type="number"
                    value={form.Survival_Years}
                    onChange={(e) => handleChange('Survival_Years', e.target.value)}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  Predict Severity Score
                </>
              )}
            </button>
          </div>

          {(result || error) && (
            <div className="px-6 pb-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">Error</h3>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}
              
              {result && result.success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h3 className="font-semibold text-green-900 text-lg">Prediction Complete</h3>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Predicted Severity Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {result.predicted_severity_score.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          API Endpoint: <code className="bg-white px-2 py-1 rounded">{API_BASE_URL}/predict-ann</code>
        </div>
      </div>
    </div>
  );
}