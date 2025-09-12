
import warnings
warnings.filterwarnings("ignore")

import os
import sys
import json
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, balanced_accuracy_score, f1_score

from sklearn.ensemble import RandomForestClassifier

HAS_XGB = False
HAS_LGBM = False
try:
    from xgboost import XGBClassifier
    HAS_XGB = True
except Exception as e:
    print("XGBoost unavailable, skipping. Reason:", e)

try:
    from lightgbm import LGBMClassifier
    HAS_LGBM = True
except Exception as e:
    print("LightGBM unavailable, skipping. Reason:", e)

from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.over_sampling import SMOTE


def load_and_clean(csv_path: str) -> tuple[pd.DataFrame, pd.Series]:
    """Load dataset, split blood pressure if needed, drop IDs, fill target NAs."""
    if not os.path.exists(csv_path):
        print(f"CSV not found: {csv_path}")
        sys.exit(1)

    df = pd.read_csv(csv_path)

    if "Blood Pressure" in df.columns:
        bp_split = df["Blood Pressure"].astype(str).str.split("/", expand=True)
        try:
            df["Systolic"] = bp_split[0].astype(int)
            df["Diastolic"] = bp_split[1].astype(int)
        except Exception:
            df["Systolic"] = pd.to_numeric(bp_split[0], errors="coerce").fillna(0).astype(int)
            df["Diastolic"] = pd.to_numeric(bp_split[1], errors="coerce").fillna(0).astype(int)
        df.drop(columns=["Blood Pressure"], inplace=True)

    for col in ["Person ID", "PersonID", "ID"]:
        if col in df.columns:
            df.drop(columns=[col], inplace=True)

    if "Sleep Disorder" not in df.columns:
        print("Missing target column 'Sleep Disorder' in dataset.")
        sys.exit(1)

    df["Sleep Disorder"] = df["Sleep Disorder"].fillna("None")

    X = df.drop(columns=["Sleep Disorder"])
    y = df["Sleep Disorder"]

    return X, y


def build_preprocessor(X_train: pd.DataFrame) -> ColumnTransformer:
    """Create a ColumnTransformer with OneHot for categoricals and StandardScaler for numerics."""
    categorical_cols = X_train.select_dtypes(include=["object"]).columns.tolist()
    numerical_cols = X_train.select_dtypes(include=["number"]).columns.tolist()

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols),
            ("num", StandardScaler(), numerical_cols),
        ]
    )
    return preprocessor


def build_pipelines(preprocessor: ColumnTransformer) -> dict:
    """Create model pipelines (RandomForest always; XGB/LGBM if available)."""
    pipelines = {
        "RandomForest": ImbPipeline(steps=[
            ("prep", preprocessor),
            ("smote", SMOTE(random_state=42)),
            ("clf", RandomForestClassifier(
                n_estimators=300, random_state=42, class_weight="balanced"))
        ])
    }

    if HAS_XGB:
        pipelines["XGBoost"] = ImbPipeline(steps=[
            ("prep", preprocessor),
            ("smote", SMOTE(random_state=42)),
            ("clf", XGBClassifier(
                n_estimators=300,
                max_depth=5,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                eval_metric="mlogloss",
                random_state=42,
                tree_method="hist"
            ))
        ])

    if HAS_LGBM:
        pipelines["LightGBM"] = ImbPipeline(steps=[
            ("prep", preprocessor),
            ("smote", SMOTE(random_state=42)),
            ("clf", LGBMClassifier(
                n_estimators=300,
                max_depth=5,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42
            ))
        ])

    return pipelines


def evaluate_and_pick_best(pipelines: dict, X_train, y_train_enc, X_test, y_test_enc, class_names: list[str]) -> tuple[str, ImbPipeline, dict]:
    """Train, evaluate, print reports; pick best by F1 (changeable)."""
    results = {}
    for name, pipe in pipelines.items():
        pipe.fit(X_train, y_train_enc)  
        y_pred_enc = pipe.predict(X_test)

        acc = accuracy_score(y_test_enc, y_pred_enc)
        bal_acc = balanced_accuracy_score(y_test_enc, y_pred_enc)
        f1 = f1_score(y_test_enc, y_pred_enc, average="weighted")
        report = classification_report(y_test_enc, y_pred_enc, target_names=class_names)

        results[name] = {
            "Accuracy": acc,
            "Balanced Accuracy": bal_acc,
            "F1 Score": f1,
            "Report": report
        }

        print(f"\n=== {name} ===")
        print(f"Accuracy         : {acc:.4f}")
        print(f"Balanced Accuracy: {bal_acc:.4f}")
        print(f"F1 (weighted)    : {f1:.4f}")
        print(report)

    print("\n" + "=" * 60)
    print("MODEL COMPARISON")
    metric = "F1 Score"  
    best_name, best_score = None, -1.0
    for name, r in results.items():
        print(f"{name}: Acc={r['Accuracy']:.4f} | BalAcc={r['Balanced Accuracy']:.4f} | F1={r['F1 Score']:.4f}")
        if r[metric] > best_score:
            best_score = r[metric]
            best_name = name

    if best_name is None:
        print("No models evaluated. Check your setup.")
        sys.exit(1)

    print(f"\nBest model by {metric}: {best_name} ({best_score:.4f})")
    return best_name, pipelines[best_name], results


def main():
    csv_path = "dataset.csv"
    X, y = load_and_clean(csv_path)

    try:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.20, random_state=42, stratify=y
        )
    except ValueError:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.20, random_state=42
        )

    le = LabelEncoder()
    y_train_enc = le.fit_transform(y_train)
    y_test_enc = le.transform(y_test)
    class_names = le.classes_.tolist()

    preprocessor = build_preprocessor(X_train)
    pipelines = build_pipelines(preprocessor)

    if not pipelines:
        print("No pipelines available. Install at least scikit-learn. "
              "Optional: xgboost/lightgbm for extra models.")
        sys.exit(1)

    best_name, best_pipeline, _ = evaluate_and_pick_best(
        pipelines, X_train, y_train_enc, X_test, y_test_enc, class_names
    )

    artifact = {
        "model_name": best_name,
        "pipeline": best_pipeline,        
        "label_classes": class_names         
    }
    out_path = "sleep_disorder_best_model.joblib"
    joblib.dump(artifact, out_path)
    print(f"\nSaved: {out_path}")


if __name__ == "__main__":
    main()
