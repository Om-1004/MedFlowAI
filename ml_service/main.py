import os
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from joblib import load

REV_GENDER = {0: "Male", 1: "Female"}
REV_OCC = {
    0: "Software Engineer", 1: "Doctor", 2: "Teacher",
    3: "Lawyer", 4: "Nurse", 5: "Accountant"
}
REV_BMI = {0: "Normal", 1: "Overweight", 2: "Obese", 3: "Underweight"}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "svm_pipeline.joblib")
LE_PATH = os.path.join(BASE_DIR, "models", "label_encoder.joblib")
model = load(MODEL_PATH)
label_encoder = load(LE_PATH)
print(f"Artifacts loaded:\n- {MODEL_PATH}\n- {LE_PATH}")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    Gender: int
    Age: int
    Occupation: int
    Sleep_Duration: float
    Quality_of_Sleep: int
    Physical_Activity_Level: int
    Stress_Level: int
    BMI_Category: int
    Heart_Rate: int
    Daily_Steps: int
    Blood_Pressure_Systolic: int
    Blood_Pressure_Diastolic: int

CATEGORICAL_COLS = ["Gender", "Occupation", "BMI Category"]
NUMERIC_COLS = [
    "Age", "Sleep Duration", "Quality of Sleep", "Physical Activity Level",
    "Stress Level", "Heart Rate", "Daily Steps", "Systolic", "Diastolic",
]

def expected_training_columns():
    """Columns the preprocessor was fit with (cat + num)."""
    prep = model.named_steps["preprocessor"]
    try:
        cat_cols = list(prep.transformers_[0][2])
        num_cols = list(prep.transformers_[1][2])
        return cat_cols + num_cols
    except Exception:
        return CATEGORICAL_COLS + NUMERIC_COLS

@app.get("/")
def read_root():
    return {"message": "API is running. Model is loaded."}

@app.post("/api/predict")
async def predict(data: InputData):
    try:
        gender_str = REV_GENDER.get(data.Gender)
        occ_str    = REV_OCC.get(data.Occupation)
        bmi_str    = REV_BMI.get(data.BMI_Category)
        if gender_str is None or occ_str is None or bmi_str is None:
            return {"error": "Bad categorical encoding",
                    "details": {"Gender": data.Gender, "Occupation": data.Occupation, "BMI_Category": data.BMI_Category}}

        df = pd.DataFrame([{
            "Gender": gender_str,
            "Age": data.Age,
            "Occupation": occ_str,
            "Sleep Duration": data.Sleep_Duration,
            "Quality of Sleep": data.Quality_of_Sleep,
            "Physical Activity Level": data.Physical_Activity_Level,
            "Stress Level": data.Stress_Level,
            "BMI Category": bmi_str,
            "Heart Rate": data.Heart_Rate,
            "Daily Steps": data.Daily_Steps,
            "Systolic": data.Blood_Pressure_Systolic,
            "Diastolic": data.Blood_Pressure_Diastolic,
        }])

        for c in CATEGORICAL_COLS:
            df[c] = df[c].astype("object")
        for c in NUMERIC_COLS:
            df[c] = pd.to_numeric(df[c], errors="raise").astype(float)

        required = set(expected_training_columns())
        have = set(df.columns)
        missing = sorted(required - have)
        extra = sorted(have - required)
        if missing or extra:
            return {"error": "Prediction failed",
                    "details": {"reason": "Column mismatch", "missing": missing, "extra": extra, "have_now": sorted(df.columns)}}

        y_enc = model.predict(df)[0]
        y_label = label_encoder.inverse_transform([y_enc])[0]
        return {"prediction": y_label}

    except Exception as e:
        try:
            print("DF dtypes:\n", df.dtypes)
            print("DF values:\n", df.to_dict(orient="records")[0])
        except Exception:
            pass
        return {"error": "Prediction failed", "details": str(e)}
