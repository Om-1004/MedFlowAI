import os
import pandas as pd
from joblib import load
from tensorflow.keras.models import load_model
from fastapi import FastAPI
from pydantic import BaseModel

# -------------------------
# Paths
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PREPROCESSOR_PATH = os.path.join(BASE_DIR, "preprocessor.joblib")
ANN_MODEL_PATH = os.path.join(BASE_DIR, "ann_model.keras")

# -------------------------
# Load preprocessor & model
# -------------------------
print("🔄 Loading ANN model and preprocessor...")
preprocessor = load(PREPROCESSOR_PATH)
model = load_model(ANN_MODEL_PATH)
print("✅ ANN model and preprocessor loaded!")

# -------------------------
# FastAPI app
# -------------------------
app = FastAPI()

# -------------------------
# Request schema
# -------------------------
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


# -------------------------
# Prediction endpoint
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
