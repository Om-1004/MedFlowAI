// mode.controller.js
import axios from "axios";

export const test = async (_req, res) => {
  res.json({ message: "Works" });
};

export const sendData = async (req, res) => {
  try {
    const {
      gender,
      age,
      occupation,
      sleepDuration,
      qualitySleep,
      physicalActivity,
      stressLevel,
      BMI,
      systolic,
      diastolic,
      heartRate,
      dailySteps,
    } = req.body;

    // Basic validation
    const missing = [];
    for (const [k, v] of Object.entries({
      gender, age, occupation, sleepDuration, qualitySleep,
      physicalActivity, stressLevel, BMI, systolic, diastolic,
      heartRate, dailySteps,
    })) {
      if (v === null || v === undefined || v === "") missing.push(k);
    }
    if (missing.length) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    // ✅ Forward EXACTLY what FastAPI expects (camelCase + raw categories)
    const payload = {
      gender,                // "Male" | "Female"
      age: Number(age),
      occupation,            // e.g., "Software Engineer"
      sleepDuration: Number(sleepDuration),
      qualitySleep: Number(qualitySleep),
      physicalActivity: Number(physicalActivity),
      stressLevel: Number(stressLevel),
      BMI,                   // "Normal" | "Overweight" | "Obese" | "Underweight"
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      heartRate: Number(heartRate),
      dailySteps: Number(dailySteps),
    };

    // ✅ Correct FastAPI route (no /api prefix unless you added it yourself)
    const fastapiURL = process.env.ML_URL || "http://localhost:8000/predict";

    const { data } = await axios.post(fastapiURL, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    if (!data?.success) {
      return res.status(502).json({
        success: false,
        error: "FastAPI error",
        details: data,
      });
    }

    return res.json({ success: true, prediction: data.prediction });
  } catch (error) {
    console.error("Error forwarding data to FastAPI:", error.message);
    const status = error.response?.status;
    const body = error.response?.data;
    if (status) console.error("FastAPI responded with:", status, body);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: body || error.message,
    });
  }
};
