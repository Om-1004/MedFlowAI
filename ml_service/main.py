import os
import pandas as pd
from typing import Optional, Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from joblib import load


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.getenv(
    "MODEL_PATH",
    os.path.join(BASE_DIR, "sleep_disorder_best_model.joblib")
)


_loaded_obj: Optional[Any] = None
_model: Optional[Any] = None
_label_encoder: Optional[Any] = None

def _load_model():
    global _loaded_obj, _model, _label_encoder
    _loaded_obj = load(MODEL_PATH)

    if isinstance(_loaded_obj, dict):

        _model = (
            _loaded_obj.get("pipeline")
            or _loaded_obj.get("model")
            or _loaded_obj.get("clf")
        )
        _label_encoder = _loaded_obj.get("label_encoder")
    else:
        _model = _loaded_obj

    if _model is None:
        raise RuntimeError(
            "Loaded artifact does not contain a model/pipeline. "
            "Expected keys like 'pipeline' or 'model' if saved as a dict."
        )

try:
    _load_model()
    print(f"[OK] Loaded model from: {MODEL_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load model from {MODEL_PATH}: {e}")

app = FastAPI(title="Sleep Disorder Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SleepFeatures(BaseModel):
    gender: str = Field(..., description="Male/Female")
    age: int
    occupation: str
    sleepDuration: float = Field(..., description="Hours slept (e.g., 6.5)")
    qualitySleep: int = Field(..., description="Quality score (e.g., 1–10)")
    physicalActivity: int = Field(..., description="Minutes or score used in training")
    stressLevel: int = Field(..., description="Stress score used in training")
    BMI: str = Field(..., description="e.g., Normal/Overweight/Obese/Underweight")
    systolic: int
    diastolic: int
    heartRate: int
    dailySteps: int

    @validator("gender")
    def normalize_gender(cls, v):
        return v.strip().title()

    @validator("BMI")
    def normalize_bmi(cls, v):
        return v.strip().title()


@app.get("/")
def root():
    return {
        "message": "Sleep Disorder Prediction API is running!",
        "model_loaded": _model is not None,
        "expects_columns": [
            "Gender", "Age", "Occupation",
            "Sleep Duration", "Quality of Sleep",
            "Physical Activity Level", "Stress Level",
            "BMI Category", "Systolic", "Diastolic",
            "Heart Rate", "Daily Steps"
        ],
        "predict_route": "/predict",
        "method": "POST",
    }

@app.post("/predict")
def predict(features: SleepFeatures):
    if _model is None:
        return {"success": False, "error": "Model not loaded. Check server logs and MODEL_PATH."}

    try:
        row = {
            "Gender": features.gender,
            "Age": features.age,
            "Occupation": features.occupation,
            "Sleep Duration": features.sleepDuration,
            "Quality of Sleep": features.qualitySleep,
            "Physical Activity Level": features.physicalActivity,
            "Stress Level": features.stressLevel,
            "BMI Category": features.BMI,
            "Systolic": features.systolic,
            "Diastolic": features.diastolic,
            "Heart Rate": features.heartRate,
            "Daily Steps": features.dailySteps,
        }
        X = pd.DataFrame([row])

        y_pred = _model.predict(X)
        pred = y_pred[0]

        if _label_encoder is not None:
            try:
                pred = _label_encoder.inverse_transform([pred])[0]
            except Exception:
                pass

        return {"success": True, "prediction": str(pred)}

    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/health")
def health():
    return {"ok": True, "model_loaded": _model is not None, "model_path": MODEL_PATH}
