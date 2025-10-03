import os
import io
import pandas as pd
import numpy as np
from typing import Optional, Any

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from joblib import load
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.getenv(
    "MODEL_PATH",
    os.path.join(BASE_DIR, "sleep_disorder_best_model.joblib")
)
CNN_MODEL_PATH = os.path.join(BASE_DIR, "cnn_model.keras")
PREPROCESSOR_PATH = os.path.join(BASE_DIR, "preprocessor.joblib")
ANN_MODEL_PATH = os.path.join(BASE_DIR, "ann_model.keras")
preprocessor = load(PREPROCESSOR_PATH)
model = load_model(ANN_MODEL_PATH)

_loaded_obj: Optional[Any] = None
_model: Optional[Any] = None
_label_encoder: Optional[Any] = None
_cnn_model: Optional[Any] = None


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
        raise RuntimeError("Loaded artifact does not contain a model/pipeline.")


def _load_cnn():
    global _cnn_model
    try:
        _cnn_model = load_model(CNN_MODEL_PATH)
        print(f"[OK] Loaded CNN model from: {CNN_MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Failed to load CNN model: {e}")


try:
    _load_model()
    print(f"[OK] Loaded joblib model from: {MODEL_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load joblib model: {e}")

_load_cnn()

app = FastAPI(title="Sleep Disorder Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SleepFeatures(BaseModel):
    gender: str
    age: int
    occupation: str
    sleepDuration: float
    qualitySleep: int
    physicalActivity: int
    stressLevel: int
    BMI: str
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

class ANNRequest(BaseModel):
    Gender: str
    Country_Region: str
    Cancer_Type: str
    Cancer_Stage: str
    Age: int
    Year: int
    Genetic_Risk: float
    Air_Pollution: float
    Alcohol_Use: float
    Smoking: float
    Obesity_Level: float
    Treatment_Cost_USD: float
    Survival_Years: float


@app.get("/")
def root():
    return {
        "message": "Sleep Disorder Prediction API is running!",
        "joblib_model_loaded": _model is not None,
        "cnn_model_loaded": _cnn_model is not None,
        "predict_route_joblib": "/predict",
        "predict_route_cnn": "/predict_cnn",
    }


@app.post("/predict")
def predict(features: SleepFeatures):
    if _model is None:
        return {"success": False, "error": "Joblib model not loaded."}

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


@app.post("/predict_cnn")
async def predict_cnn(file: UploadFile = File(...)):
    if _cnn_model is None:
        return {"success": False, "error": "CNN model not loaded."}

    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")

        img = img.resize((128, 128))  

        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        y_pred = _cnn_model.predict(img_array)
        pred_class = int(np.argmax(y_pred, axis=1)[0])

        return {
            "success": True,
            "predicted_class": pred_class,
            "raw_output": y_pred.tolist()
        }

    except Exception as e:
        return {"success": False, "error": str(e)}

    if _cnn_model is None:
        return {"success": False, "error": "CNN model not loaded."}

    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")

        img = img.resize((128, 128))   

        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        y_pred = _cnn_model.predict(img_array)
        pred_class = int(np.argmax(y_pred, axis=1)[0])

        return {
            "success": True,
            "predicted_class": pred_class,
            "raw_output": y_pred.tolist()
        }

    except Exception as e:
        return {"success": False, "error": str(e)}
    if _cnn_model is None:
        return {"success": False, "error": "CNN model not loaded."}

    try:
        X = np.array(data.get("features")).reshape(1, -1)

        y_pred = _cnn_model.predict(X)
        pred_class = int(np.argmax(y_pred, axis=1)[0])

        return {
            "success": True,
            "raw_output": y_pred.tolist(),
            "predicted_class": pred_class,
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/health")
def health():
    return {
        "ok": True,
        "joblib_model_loaded": _model is not None,
        "cnn_model_loaded": _cnn_model is not None,
        "joblib_model_path": MODEL_PATH,
        "cnn_model_path": CNN_MODEL_PATH,
    }


# -------------------------
@app.post("/predict_ann")
def predict_ann(request: ANNRequest):
    print("📥 Incoming request:", request.dict())

    # Convert request to DataFrame
    input_df = pd.DataFrame([request.dict()])
    print("📝 Input DataFrame:\n", input_df)

    # Transform with preprocessor
    processed_input = preprocessor.transform(input_df)
    print("🔧 Processed input shape:", processed_input.shape)
    print("🔧 Processed values:\n", processed_input)

    # Run ANN prediction
    raw_pred = model.predict(processed_input)
    raw_score = float(raw_pred[0][0])
    print("📊 Raw ANN prediction:", raw_score)

    # Guarantee no negative prediction leaks out
    safe_score = raw_score if raw_score > 0 else 0.0
    print("✅ Final non-negative score returned:", safe_score)

    return {
        "success": True,
        "raw_score": raw_score,
        "predicted_score": safe_score
    }