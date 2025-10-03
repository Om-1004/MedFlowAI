import sklearn
print("Sklearn version:", sklearn.__version__)

import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.optimizers import Adam
import joblib

print("Scikit-learn version:", __import__('sklearn').__version__)
print("TensorFlow version:", tf.__version__)

# Load dataset
dataset = pd.read_csv('global_cancer_patients_2015_2024.csv')
print("Dataset shape:", dataset.shape)
print("Columns:", dataset.columns.tolist())

dataset = dataset.drop(columns=["Patient_ID"])

# Define categorical and numerical columns
categorical_cols = ["Gender", "Country_Region", "Cancer_Type", "Cancer_Stage"]
numerical_cols = ["Age", "Year", "Genetic_Risk", "Air_Pollution",
                  "Alcohol_Use", "Smoking", "Obesity_Level",
                  "Treatment_Cost_USD", "Survival_Years"]

# Separate features and target
X = dataset.drop(columns=["Target_Severity_Score"])
y = dataset["Target_Severity_Score"]

print("\nTarget statistics:")
print(f"Mean: {y.mean():.2f}, Std: {y.std():.2f}")
print(f"Min: {y.min():.2f}, Max: {y.max():.2f}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\nTraining samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), categorical_cols),
        ('num', StandardScaler(), numerical_cols)
    ],
    remainder='passthrough'
)

X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)

print("\nPreprocessor feature names:", preprocessor.get_feature_names_out())
print("Training shape:", X_train_processed.shape)
print("Test shape:", X_test_processed.shape)

model = Sequential([
    Dense(256, activation='relu', input_shape=(X_train_processed.shape[1],)),
    BatchNormalization(),
    Dropout(0.4),

    Dense(128, activation='relu'),
    BatchNormalization(),
    Dropout(0.3),

    Dense(64, activation='relu'),
    BatchNormalization(),

    Dense(32, activation='relu'),
    Dense(1, activation="linear")
])

model.compile(optimizer=Adam(learning_rate=0.001), loss='mse', metrics=['mae'])

print("\nModel Summary:")
model.summary()

es = EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True)

print("\nTraining model...")
history = model.fit(
    X_train_processed, y_train,
    validation_data=(X_test_processed, y_test),
    epochs=200,
    batch_size=64,
    callbacks=[es],
    verbose=1
)

y_pred = model.predict(X_test_processed)
print("\n" + "="*50)
print("MODEL PERFORMANCE")
print("="*50)
print(f"MAE: {mean_absolute_error(y_test, y_pred):.4f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.4f}")
print(f"R²:  {r2_score(y_test, y_pred):.4f}")
print("="*50)


print("\nSaving model and preprocessor...")
model.save('ann_model.keras')
joblib.dump(preprocessor, 'preprocessor.joblib')

print("Files saved successfully!")
print("   - ann_model.keras")
print("   - preprocessor.joblib")


print("\n" + "="*50)
print("VERIFICATION TEST")
print("="*50)

test_input = pd.DataFrame([{
    "Gender": "Male",
    "Country_Region": "Pakistan",
    "Cancer_Type": "Breast",
    "Cancer_Stage": "Stage III",
    "Age": 70,
    "Year": 2022,
    "Genetic_Risk": 3.6,
    "Air_Pollution": 3.9,
    "Alcohol_Use": 2.9,
    "Smoking": 6.5,
    "Obesity_Level": 0.1,
    "Treatment_Cost_USD": 65719.90,
    "Survival_Years": 9.8
}])

print("Test input:")
print(test_input.T)

processed = preprocessor.transform(test_input)
prediction = model.predict(processed, verbose=0)

print(f"\n🎯 Predicted Score: {prediction[0][0]:.2f}")
print("="*50)
