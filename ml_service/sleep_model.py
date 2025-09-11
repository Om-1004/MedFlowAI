import pandas as pd
import numpy as np
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.over_sampling import SMOTE

dataset = pd.read_csv('dataset.csv')

bp_split = dataset['Blood Pressure'].str.split('/', expand=True)
dataset['Systolic'] = bp_split[0].astype(int)
dataset['Diastolic'] = bp_split[1].astype(int)
dataset.drop(columns=['Blood Pressure'], inplace=True)

dataset["Sleep Disorder"] = dataset["Sleep Disorder"].fillna("None")

X = dataset.drop(columns=['Person ID', 'Sleep Disorder'])
y = dataset['Sleep Disorder']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

le = LabelEncoder()
y_train = le.fit_transform(y_train)
y_test = le.transform(y_test)

categorical_cols = X_train.select_dtypes(include='object').columns.tolist()
numerical_cols = X_train.select_dtypes(include='number').columns.tolist()

onehot_encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=False)
scaler = StandardScaler()

preprocessor = ColumnTransformer(transformers=[
    ('cat', onehot_encoder, categorical_cols),
    ('num', scaler, numerical_cols)
])

pipeline = ImbPipeline(steps=[
    ('preprocessor', preprocessor),
    ('smote', SMOTE(random_state=42)),
    ('classifier', SVC(probability=True, class_weight='balanced'))
])

pipeline.fit(X_train, y_train)


encoded_feature_names = (
    pipeline.named_steps["preprocessor"]
    .named_transformers_["cat"]
    .get_feature_names_out(categorical_cols)
)
final_feature_names = list(encoded_feature_names) + numerical_cols

model_dir = os.path.join(os.path.dirname(__file__), "models")
os.makedirs(model_dir, exist_ok=True)

joblib.dump(pipeline, os.path.join(model_dir, "svm_pipeline.joblib"))
joblib.dump(le, os.path.join(model_dir, "label_encoder.joblib"))
joblib.dump(final_feature_names, os.path.join(model_dir, "feature_names.joblib"))

print("Model, encoder, and feature names saved.")

y_pred = pipeline.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"\nSVM Test Accuracy: {acc * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))