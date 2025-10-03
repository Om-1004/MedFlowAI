import React, { useState } from "react";
import {
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const PredictANN = () => {
  const [formData, setFormData] = useState({
    Gender: "",
    Country_Region: "",
    Cancer_Type: "",
    Cancer_Stage: "",
    Age: "",
    Year: "",
    Genetic_Risk: "",          
    Air_Pollution: "",          
    Alcohol_Use: "",          
    Smoking: "",              
    Obesity_Level: "",         
    Treatment_Cost_USD: "",    
    Survival_Years: ""         
  });

  console.log();
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const dropdownOptions = {
    Gender: ["Male", "Female", "Other"],
    Country_Region: [
      "UK",
      "China",
      "Pakistan",
      "Brazil",
      "Germany",
      "Canada",
      "USA",
      "India",
      "Australia",
      "Russia",
    ],
    Cancer_Type: [
      "Lung",
      "Leukemia",
      "Breast",
      "Colon",
      "Skin",
      "Cervical",
      "Prostate",
      "Liver",
    ],
    Cancer_Stage: ["Stage 0", "Stage I", "Stage II", "Stage III", "Stage IV"],
  };

  const limitedFields = [
    "Genetic_Risk",
    "Air_Pollution",
    "Alcohol_Use",
    "Smoking",
    "Obesity_Level",
  ];

  const fieldCategories = {
    "Patient Demographics": ["Gender", "Country_Region", "Age", "Year"],
    "Cancer Information": ["Cancer_Type", "Cancer_Stage"],
    "Risk Factors": [
      "Genetic_Risk",
      "Air_Pollution",
      "Alcohol_Use",
      "Smoking",
      "Obesity_Level",
    ],
    "Treatment Details": ["Treatment_Cost_USD", "Survival_Years"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (limitedFields.includes(name)) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        newValue = Math.min(10, Math.max(0, num));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async () => {
    const allFieldsFilled = Object.values(formData).every((val) => val !== "");

    if (!allFieldsFilled) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_ML_SERVICE_URL}/predict_ann`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          Age: parseInt(formData.Age),
          Year: parseInt(formData.Year),
          Genetic_Risk: parseFloat(formData.Genetic_Risk),
          Air_Pollution: parseFloat(formData.Air_Pollution),
          Alcohol_Use: parseFloat(formData.Alcohol_Use),
          Smoking: parseFloat(formData.Smoking),
          Obesity_Level: parseFloat(formData.Obesity_Level),
          Treatment_Cost_USD: parseFloat(formData.Treatment_Cost_USD),
          Survival_Years: parseFloat(formData.Survival_Years),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction error:", err);
      setResult({ success: false, message: "Prediction failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: "#fff7ed" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="bg-white shadow-sm border-l-4 mb-6 p-6 rounded-r-lg"
          style={{ borderLeftColor: "#f97316" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#ffedd5" }}
            >
              <Activity className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Cancer Survival Score Predictor
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4" style={{ backgroundColor: "#f97316" }}>
            <h2 className="text-lg font-semibold text-white">
              Patient Information
            </h2>
          </div>

          <div className="p-8">
            {Object.entries(fieldCategories).map(([category, fields], idx) => (
              <div key={category} className={idx > 0 ? "mt-8" : ""}>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="h-0.5 w-8"
                    style={{ backgroundColor: "#f97316" }}
                  ></div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    {category}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {fields.map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {key.replace(/_/g, " ")}
                        {limitedFields.includes(key) && (
                          <span
                            className="ml-1 font-normal"
                            style={{ color: "#f97316" }}
                          >
                            (0-10)
                          </span>
                        )}
                      </label>

                      {dropdownOptions[key] ? (
                        <select
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white transition-all"
                          style={{
                            focusBorderColor: "#f97316",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#f97316";
                            e.target.style.boxShadow = "0 0 0 3px #ffedd5";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow = "none";
                          }}
                        >
                          <option value="">Select...</option>
                          {dropdownOptions[key].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          min={limitedFields.includes(key) ? 0 : undefined}
                          max={limitedFields.includes(key) ? 10 : undefined}
                          step={limitedFields.includes(key) ? 0.1 : undefined}
                          className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                          onFocus={(e) => {
                            e.target.style.borderColor = "#f97316";
                            e.target.style.boxShadow = "0 0 0 3px #ffedd5";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-10">
              <button
                onClick={handleSubmit}
                className="w-full text-white font-semibold py-4 px-6 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                style={{ backgroundColor: loading ? "#f97316" : "#ea580c" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#c2410c")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = loading
                    ? "#f97316"
                    : "#ea580c")
                }
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Analysis...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Generate Risk Prediction
                  </>
                )}
              </button>
            </div>
          </div>

          {result && (
            <div
              className="border-t-4 p-8"
              style={{ borderTopColor: "#ffedd5", backgroundColor: "#fff7ed" }}
            >
              {result.success ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        Analysis Complete
                      </h3>
                      <p className="text-sm text-gray-600">
                        Results generated successfully
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div
                      className="bg-white border-2 rounded-lg p-5 shadow-sm"
                      style={{ borderColor: "#ffedd5" }}
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "#f97316" }}
                      >
                        Raw Model Output
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {result.raw_score.toFixed(4)}
                      </div>
                    </div>
                    <div
                      className="bg-white border-2 rounded-lg p-5 shadow-sm"
                      style={{ borderColor: "#ffedd5" }}
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "#f97316" }}
                      >
                        Predicted Survival Score
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {result.predicted_score.toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-3 border-l-4 p-4 rounded-r-lg"
                    style={{
                      backgroundColor: "#ffedd5",
                      borderLeftColor: "#f97316",
                    }}
                  >
                    <AlertCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#ea580c" }}
                    />
                    <p className="text-sm" style={{ color: "#7c2d12" }}>
                      This prediction is generated by an artificial neural
                      network model. Results should be interpreted by qualified
                      healthcare professionals and are not a substitute for
                      medical advice.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <div className="bg-red-500 p-2 rounded-lg">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-red-900">
                      Prediction Failed
                    </div>
                    <div className="text-sm text-red-700 mt-1">
                      Unable to generate prediction. Please check your inputs
                      and try again.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default PredictANN;
