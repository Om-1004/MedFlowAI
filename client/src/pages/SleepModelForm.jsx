import React, { useState, useMemo } from "react";
import { Moon, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function SleepModelForm() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    occupation: "",
    sleepDuration: "",
    qualitySleep: "",
    physicalActivity: "",
    stressLevel: "",
    BMI: "",
    heartRate: "",
    dailySteps: "",
    systolic: "",
    diastolic: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLASS_MAP = {
    0: "No Sleep Disorder",
    1: "Sleep Apnea",
    2: "Insomnia",
    None: "No Sleep Disorder",
    "Sleep Apnea": "Sleep Apnea",
    Insomnia: "Insomnia",
  };

  const displayPrediction = (raw) => {
    if (raw === null || raw === undefined) return raw;
    return CLASS_MAP.hasOwnProperty(raw) ? CLASS_MAP[raw] : String(raw);
  };

  const isFormValid = useMemo(() => {
    const required = [
      "gender",
      "age",
      "occupation",
      "sleepDuration",
      "qualitySleep",
      "physicalActivity",
      "stressLevel",
      "BMI",
      "systolic",
      "diastolic",
      "heartRate",
      "dailySteps",
    ];
    return required.every(
      (k) =>
        formData[k] !== "" && formData[k] !== null && formData[k] !== undefined
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const finalPayload = {
      gender: formData.gender,
      age: Number(formData.age),
      occupation: formData.occupation,
      sleepDuration: Number(formData.sleepDuration),
      qualitySleep: Number(formData.qualitySleep),
      physicalActivity: Number(formData.physicalActivity),
      stressLevel: Number(formData.stressLevel),
      BMI: formData.BMI,
      systolic: Number(formData.systolic),
      diastolic: Number(formData.diastolic),
      heartRate: Number(formData.heartRate),
      dailySteps: Number(formData.dailySteps),
    };

    try {
      // Simulated API call for demo
      setTimeout(() => {
        const pred = ["No Sleep Disorder", "Sleep Apnea", "Insomnia"][Math.floor(Math.random() * 3)];
        setPrediction(pred);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Prediction error:", err);
      const msg = err?.message || "An error occurred while making the prediction";
      setError(msg);
      setLoading(false);
    }
  };

  const getPredictionColor = (pred) => {
    if (pred === "No Sleep Disorder") return { bg: '#dcfce7', border: '#86efac', text: '#166534' };
    if (pred === "Sleep Apnea") return { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b' };
    if (pred === "Insomnia") return { bg: '#fed7aa', border: '#fdba74', text: '#9a3412' };
    return { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af' };
  };

  const fieldCategories = {
    'Personal Information': [
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
      { name: 'age', label: 'Age', type: 'number', min: 0 },
      { name: 'occupation', label: 'Occupation', type: 'select', options: ['Doctor', 'Teacher', 'Student', 'Nurse', 'Driver', 'Artist', 'Scientist', 'Athlete', 'Unemployed', 'Software Engineer'] }
    ],
    'Sleep Patterns': [
      { name: 'sleepDuration', label: 'Sleep Duration (hours)', type: 'number', step: 0.1 },
      { name: 'qualitySleep', label: 'Quality of Sleep (1-10)', type: 'number', min: 1, max: 10 }
    ],
    'Health Metrics': [
      { name: 'BMI', label: 'BMI Category', type: 'select', options: ['Normal', 'Overweight', 'Obese', 'Underweight'] },
      { name: 'heartRate', label: 'Heart Rate (bpm)', type: 'number' }
    ],
    'Lifestyle Factors': [
      { name: 'physicalActivity', label: 'Physical Activity Level (1-10)', type: 'number', min: 1 },
      { name: 'stressLevel', label: 'Stress Level (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'dailySteps', label: 'Daily Steps', type: 'number' }
    ],
    'Blood Pressure': []
  };

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: '#f0fdf4' }}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-sm border-l-4 mb-6 p-6 rounded-r-lg" style={{ borderLeftColor: '#22c55e' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#dcfce7' }}>
              <Moon className="w-6 h-6" style={{ color: '#22c55e' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sleep Disorder Predictor</h1>
              <p className="text-sm text-gray-600 mt-0.5">AI-powered sleep health analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4" style={{ backgroundColor: '#22c55e' }}>
            <h2 className="text-lg font-semibold text-white">Health Assessment</h2>
          </div>

          <div className="p-8">
            {Object.entries(fieldCategories).map(([category, fields], idx) => (
              <div key={category} className={idx > 0 ? "mt-8" : ""}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-0.5 w-8" style={{ backgroundColor: '#22c55e' }}></div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    {category}
                  </h3>
                </div>
                
                {category === 'Blood Pressure' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Systolic Blood Pressure
                      </label>
                      <input
                        type="number"
                        name="systolic"
                        value={formData.systolic}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#22c55e';
                          e.target.style.boxShadow = '0 0 0 3px #dcfce7';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Diastolic Blood Pressure
                      </label>
                      <input
                        type="number"
                        name="diastolic"
                        value={formData.diastolic}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#22c55e';
                          e.target.style.boxShadow = '0 0 0 3px #dcfce7';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {field.label}
                        </label>

                        {field.type === 'select' ? (
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none bg-white transition-all"
                            onFocus={(e) => {
                              e.target.style.borderColor = '#22c55e';
                              e.target.style.boxShadow = '0 0 0 3px #dcfce7';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select...</option>
                            {field.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                            onFocus={(e) => {
                              e.target.style.borderColor = '#22c55e';
                              e.target.style.boxShadow = '0 0 0 3px #dcfce7';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-10">
              <button
                onClick={handleSubmit}
                className="w-full text-white font-semibold py-4 px-6 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                style={{ backgroundColor: loading ? '#22c55e' : '#16a34a' }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#15803d')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#16a34a')}
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          {(prediction || error) && (
            <div className="border-t-4 p-8" style={{ borderTopColor: '#dcfce7', backgroundColor: '#f0fdf4' }}>
              {prediction && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: getPredictionColor(prediction).bg }}>
                      <CheckCircle className="w-6 h-6" style={{ color: getPredictionColor(prediction).text }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">Analysis Complete</h3>
                      <p className="text-sm text-gray-600">Results generated successfully</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border-2 rounded-lg p-6 shadow-sm mb-5" style={{ borderColor: getPredictionColor(prediction).border }}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: getPredictionColor(prediction).text }}>
                      Sleep Disorder Classification
                    </div>
                    <div className="text-3xl font-bold mb-3" style={{ color: getPredictionColor(prediction).text }}>
                      {prediction}
                    </div>
                    <div className="text-sm text-gray-700">
                      {prediction === "No Sleep Disorder" && "Your sleep patterns appear to be healthy! Keep maintaining good sleep hygiene."}
                      {prediction === "Sleep Apnea" && "Consider consulting with a sleep specialist for further evaluation."}
                      {prediction === "Insomnia" && "You may benefit from sleep hygiene improvements and stress management techniques."}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-l-4 p-4 rounded-r-lg" style={{ backgroundColor: '#dcfce7', borderLeftColor: '#22c55e' }}>
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
                    <p className="text-sm" style={{ color: '#14532d' }}>
                      This prediction is for informational purposes only. Please consult with a healthcare professional for proper diagnosis and treatment.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPrediction(null);
                      setError(null);
                    }}
                    className="w-full mt-5 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Clear Results
                  </button>
                </div>
              )}

              {error && (
                <div>
                  <div className="flex items-center gap-4 bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-5">
                    <div className="bg-red-500 p-2 rounded-lg">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-red-900">Analysis Failed</div>
                      <div className="text-sm text-red-700 mt-1">{error}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPrediction(null);
                      setError(null);
                    }}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Clear Results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}