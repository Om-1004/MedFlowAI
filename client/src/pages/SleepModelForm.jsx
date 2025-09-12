import { useState, useMemo } from "react";
import api from "../axios/axios.js";

export default function SleepModelForm() {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: "28",
    occupation: "Software Engineer",
    sleepDuration: "5.9",
    qualitySleep: "4",
    physicalActivity: "30",
    stressLevel: "8",
    BMI: "Overweight",
    heartRate: "85",
    dailySteps: "3000",
    systolic: "140",
    diastolic: "90",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLASS_MAP = {
    0: "No Sleep Disorder",
    1: "Sleep Apnea",
    2: "Insomnia",
    0: "No Sleep Disorder",
    1: "Sleep Apnea",
    2: "Insomnia",
    None: "No Sleep Disorder",
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
      const res = await api.post("/model/sendData", finalPayload);
      const pred = res?.data?.prediction ?? null;
      setPrediction(displayPrediction(pred));
      console.log("Prediction result:", res?.data);
    } catch (err) {
      console.error("Prediction error:", err);
      const msg =
        err?.response?.data?.details ||
        err?.response?.data?.error ||
        err?.message ||
        "An error occurred while making the prediction";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = (pred) => {
    if (pred === "No Sleep Disorder")
      return "text-green-600 bg-green-50 border-green-200";
    if (pred === "Sleep Apnea") return "text-red-600 bg-red-50 border-red-200";
    if (pred === "Insomnia")
      return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-blue-600 bg-blue-50 border-blue-200";
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Sleep Disorder Predictor
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Occupation</option>
            <option value="Doctor">Doctor</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Nurse">Nurse</option>
            <option value="Driver">Driver</option>
            <option value="Artist">Artist</option>
            <option value="Scientist">Scientist</option>
            <option value="Athlete">Athlete</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Software Engineer">Software Engineer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sleep Duration (hours)
          </label>
          <input
            type="number"
            step="0.1"
            name="sleepDuration"
            value={formData.sleepDuration}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quality of Sleep (1-10)
          </label>
          <input
            type="number"
            name="qualitySleep"
            min="1"
            max="10"
            value={formData.qualitySleep}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Physical Activity Level (1-10)
          </label>
          <input
            type="number"
            name="physicalActivity"
            min="1"
            value={formData.physicalActivity}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stress Level (1-10)
          </label>
          <input
            type="number"
            name="stressLevel"
            min="1"
            max="10"
            value={formData.stressLevel}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            BMI Category
          </label>
          <select
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select BMI Category</option>
            <option value="Normal">Normal</option>
            <option value="Overweight">Overweight</option>
            <option value="Obese">Obese</option>
            <option value="Underweight">Underweight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Pressure
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="systolic"
              placeholder="Systolic"
              value={formData.systolic}
              onChange={handleChange}
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="number"
              name="diastolic"
              placeholder="Diastolic"
              value={formData.diastolic}
              onChange={handleChange}
              className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heart Rate
          </label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Steps
          </label>
          <input
            type="number"
            name="dailySteps"
            value={formData.dailySteps}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing...
            </div>
          ) : (
            "Predict Sleep Disorder"
          )}
        </button>
      </form>

      {(prediction || error) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Prediction Results
          </h3>

          {prediction && (
            <div
              className={`p-6 rounded-lg border-2 ${getPredictionColor(
                prediction
              )} shadow-lg`}
            >
              <div className="text-center">
                <p className="font-bold text-xl mb-2">{prediction}</p>
                {prediction === "No Sleep Disorder" && (
                  <p className="text-sm opacity-80">
                    Your sleep patterns appear to be healthy! Keep maintaining
                    good sleep hygiene.
                  </p>
                )}
                {prediction === "Sleep Apnea" && (
                  <p className="text-sm opacity-80">
                    Consider consulting with a sleep specialist for further
                    evaluation.
                  </p>
                )}
                {prediction === "Insomnia" && (
                  <p className="text-sm opacity-80">
                    You may benefit from sleep hygiene improvements and stress
                    management.
                  </p>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="p-6 rounded-lg border-2 border-red-200 bg-red-50 text-red-600 shadow-lg">
              <div className="text-center">
                <p className="font-bold text-xl mb-2">Prediction Failed</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          )}

          {(prediction || error) && (
            <button
              onClick={() => {
                setPrediction(null);
                setError(null);
              }}
              className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Results
            </button>
          )}
        </div>
      )}
    </div>
  );
}
