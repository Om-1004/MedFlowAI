# MedFlowAI

Official deployment: **[http://medflow-ai.in/](http://medflow-ai.in/)**

## Project Overview

MedFlowAI is an AI powered healthcare platform built to streamline early stage medical decision. It integrates predictive analytics and medical image classification for various healthcare applications. The platform primarily focuses on three healthcare use cases:

* **Sleep disorder prediction**
* **Brain tumor classification**
* **Cancer risk prediction**

The system integrates a **React** frontend with backend services built using **FastAPI**, **Node.js**, and dedicated **TensorFlow machine learning models**. It leverages **AWS cloud services**, including **DynamoDB** for data storage and **AWS Cognito** for authentication, and is designed for scalable deployment using **Docker** and **Kubernetes**.

---

## Features
- **Sleep Disorder Prediction**  
  Utilizes machine learning models trained on structured health data to analyze patient inputs and predict potential sleep disorders.

- **Brain Tumor Classification**  
  Applies deep convolutional neural networks (CNNs) to medical imaging data for automated detection and classification of brain tumors.

- **Cancer Risk Prediction**  
  Employs artificial neural networks (ANNs) to estimate cancer risk and generate probabilistic predictions.

- **Secure Authentication & Data Management**  
  Integrates AWS Cognito for secure user authentication and DynamoDB for scalable, cloud native data storage.

- **End-to-End AI Platform**  
  Combines a responsive React frontend with FastAPI and Node.js backend services, supporting real time inference, containerized deployment, and scalable orchestration using Docker and Kubernetes.


---

## Tech Stack

| Layer                | Technology                                 |
| -------------------- | ------------------------------------------ |
| **Frontend**         | React, Axios                               |
| **Backend APIs**     | FastAPI, Node.js, Express.js |
| **Machine Learning** | TensorFlow, Scikit Learn                                 |
| **Cloud Services**   | AWS, DynamoDB, Cognito, SES, Lightsail              |
| **Containerization** | Docker, Docker Compose                     |
| **Orchestration**    | Kubernetes (K8s)                           |
| **Version Control**  | Git, GitHub                                |
---

## Getting Started

### Prerequisites

Ensure the following are installed:

* **Python 3.8+**
* **Node.js 18+**
* **Docker & Docker Compose**
* **Git**

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Om-1004/MedFlowAI.git
   cd MedFlowAI
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```


3. **Install dependencies**

   **Backend (FastAPI):**

   ```bash
   cd api
   pip install -r requirements.txt
   ```

   **Machine Learning Service:**

   ```bash
   cd ../ml_service
   pip install -r requirements.txt
   ```

   **Frontend (React):**

   ```bash
   cd ../client
   npm install
   ```

---

## Running the Application



**Backend API:**

```bash
cd api
uvicorn main:app --reload
```

**ML Service:**

```bash
cd ml_service
python app.py
```

**Frontend:**

```bash
cd client
npm start
```

---

## Usage

Once the application is running:

* Open `http://localhost:3000`
* Choose a prediction workflow:

  * Sleep disorder prediction
  * Brain tumor classification
  * Cancer risk prediction
* Submit the required form data or medical images
* View prediction results returned by the TensorFlow models

### Example API Endpoint

```
POST /api/v1/analyze
Content-Type: multipart/form-data
Body: { "file": <image_file> }
```

**Sample Response:**

```json
{
  "diagnosis": "Brain Tumor Detected",
  "confidence": 0.92
}
```

---

## Configuration

The application is configured using environment variables:

| Variable               | Description              | Default                 |
| ---------------------- | ------------------------ | ----------------------- |
| `API_PORT`             | FastAPI backend port     | `8000`                  |
| `ML_SERVICE_URL`       | ML inference service URL | `http://localhost:5000` |
| `FRONTEND_PORT`        | React application port   | `3000`                  |
| `MODEL_PATH`           | Path to TensorFlow model | `./models/model`        |
---
