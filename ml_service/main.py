import os
import pandas as pd
from typing import Optional, Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
import joblib
from tensorflow.keras.models import load_model


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SLEEP_MODEL_PATH = os.path.join(BASE_DIR, "sleep_disorder_best_model.joblib")
CNN_MODEL_PATH = os.path.join(BASE_DIR, "cnn_model.keras")
ANN_MODEL_PATH = os.path.join(BASE_DIR, "ann_model.keras")
PREPROCESSOR_PATH = os.path.join(BASE_DIR, "preprocessor.joblib")

print("=== PATH DEBUG ===")
print("BASE_DIR:", BASE_DIR)
print("SLEEP_MODEL_PATH:", SLEEP_MODEL_PATH)
print("CNN_MODEL_PATH:", CNN_MODEL_PATH)
print("ANN_MODEL_PATH:", ANN_MODEL_PATH)
print("PREPROCESSOR_PATH:", PREPROCESSOR_PATH)
print("==================")


_sleep_model: Optional[Any] = None
_label_encoder: Optional[Any] = None
_cnn_model: Optional[Any] = None
ann_model = None
preprocessor = None


def _load_sleep():
    global _sleep_model, _label_encoder
    try:
        print(">>> Loading joblib sleep model...")
        sleep_obj = joblib.load(SLEEP_MODEL_PATH)
        if isinstance(sleep_obj, dict):
            _sleep_model = sleep_obj.get("pipeline") or sleep_obj.get("model")
            _label_encoder = sleep_obj.get("label_encoder")
            print("Loaded dict-based joblib model. Keys:", list(sleep_obj.keys()))
        else:
            _sleep_model = sleep_obj
            print("Loaded joblib object type:", type(_sleep_model))
        print(f"[OK] Loaded sleep model from: {SLEEP_MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Failed to load sleep model: {e}")

def _load_cnn():
    global _cnn_model
    try:
        print(">>> Loading CNN model...")
        _cnn_model = load_model(CNN_MODEL_PATH)
        print(f"[OK] Loaded CNN model from: {CNN_MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Failed to load CNN model: {e}")

def _load_ann():
    global ann_model, preprocessor
    try:
        print(">>> Loading ANN model + preprocessor...")
        ann_model = load_model(ANN_MODEL_PATH)
        preprocessor = joblib.load(PREPROCESSOR_PATH)
        print(f"[OK] Loaded ANN model and preprocessor")
        print("ANN model input:", ann_model.input_shape, "output:", ann_model.output_shape)
        print("Preprocessor features:", preprocessor.get_feature_names_out()[:10], "...")
    except Exception as e:
        print(f"[ERROR] Failed to load ANN model bundle: {e}")


_load_sleep()
_load_cnn()
_load_ann()


app = FastAPI(title="MedFlowAI Prediction API")

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
    def normalize_gender(cls, v): return v.strip().title()

    @validator("BMI")
    def normalize_bmi(cls, v): return v.strip().title()


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
        "message": "MedFlowAI Prediction API is running!",
        "sleep_model_loaded": _sleep_model is not None,
        "cnn_model_loaded": _cnn_model is not None,
        "ann_model_loaded": ann_model is not None and preprocessor is not None,
        "predict_routes": {
            "sleep": "/predict",
            "cnn": "/predict_cnn",
            "ann": "/predict_ann"
        }
    }

@app.post("/predict_ann")
def predict_ann(request: ANNRequest):
    if ann_model is None or preprocessor is None:
        return {"success": False, "error": "ANN or preprocessor not loaded"}

    print("\n--- DEBUG START /predict_ann ---")
    
    input_df = pd.DataFrame([{
        "Gender": request.Gender,
        "Country_Region": request.Country_Region,
        "Cancer_Type": request.Cancer_Type,
        "Cancer_Stage": request.Cancer_Stage,
        "Age": request.Age,
        "Year": request.Year,
        "Genetic_Risk": request.Genetic_Risk,
        "Air_Pollution": request.Air_Pollution,
        "Alcohol_Use": request.Alcohol_Use,
        "Smoking": request.Smoking,
        "Obesity_Level": request.Obesity_Level,
        "Treatment_Cost_USD": request.Treatment_Cost_USD,
        "Survival_Years": request.Survival_Years
    }])
    
    print("[DF] Input DataFrame:\n", input_df)

    processed_input = preprocessor.transform(input_df)
    print("[PROC] Shape:", processed_input.shape)

    raw_pred = ann_model.predict(processed_input, verbose=0)
    predicted_score = float(raw_pred[0][0])
    
    print("[PRED] Predicted score:", predicted_score)
    print("--- DEBUG END /predict_ann ---\n")

    return {"success": True, "predicted_score": predicted_score}

@app.get("/health")
def health():
    return {
        "ok": True,
        "sleep_model_loaded": _sleep_model is not None,
        "cnn_model_loaded": _cnn_model is not None,
        "ann_model_loaded": ann_model is not None and preprocessor is not None,
    }


@app.post("/predict_ann_test")
def predict_ann_test(request: ANNRequest):
    """Test endpoint with dummy prediction"""
    return {
        "success": True, 
        "predicted_score": 4.67,
        "note": "This is a test response. Real model needs version-matched preprocessor."
    }