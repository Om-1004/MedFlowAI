import React, { useState } from "react";

export default function PredictCnn() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setPrediction(null);

    try {
      const res = await fetch("http://localhost:8000/predict_cnn", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          CNN Sleep Disorder Predictor
        </h1>

        <input
          type="file"
          accept="image/*"
          className="mb-4 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Predicting..." : "Upload & Predict"}
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
            <p className="font-semibold text-gray-700">
              Predicted Class:{" "}
              <span className="text-blue-600">{prediction.predicted_class}</span>
            </p>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify(prediction.raw_output, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
