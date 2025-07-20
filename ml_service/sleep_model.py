import pandas as pd
import numpy as np
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE

dataset = pd.read_csv('dataset.csv')  

bp_split = dataset['Blood Pressure'].str.split('/', expand=True)
dataset['Systolic'] = bp_split[0].astype(int)
dataset['Diastolic'] = bp_split[1].astype(int)
dataset.drop(columns=['Blood Pressure'], inplace=True)

dataset["Sleep Disorder"] = dataset["Sleep Disorder"].fillna("None")

X = dataset.drop(columns=['Sleep Disorder'])
y = dataset['Sleep Disorder']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

le = LabelEncoder()
y_train = le.fit_transform(y_train)
y_test = le.transform(y_test)

categorical_cols = X_train.select_dtypes(include='object').columns.tolist()
numerical_cols = X_train.select_dtypes(include='number').columns.tolist()

ct = ColumnTransformer(transformers=[
    ('encoder', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
    ('scaler', StandardScaler(), numerical_cols)
])

X_train_transformed = ct.fit_transform(X_train)

smote = SMOTE(random_state=42)
X_train_bal, y_train_bal = smote.fit_resample(X_train_transformed, y_train)

best_model = SVC(probability=True, class_weight='balanced')
best_model.fit(X_train_bal, y_train_bal)

model_path = os.path.join(os.path.dirname(__file__), "models", "svm_model.joblib")
joblib.dump(best_model, model_path)

print(f"Model trained and saved as {model_path}")

X_test_transformed = ct.transform(X_test)
y_pred = best_model.predict(X_test_transformed)

acc = accuracy_score(y_test, y_pred)
print(f"SVM Model Test Accuracy: {acc * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))
