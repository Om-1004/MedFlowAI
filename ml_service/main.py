import os
from fastapi import FastAPI
from joblib import load

model_path = os.path.join(os.path.dirname(__file__), "models", "svm_model.joblib")
model = load(model_path)

print("Model loaded successfully inside FastAPI!")
print("Model details:\n", model)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API is running. Model is loaded."}
