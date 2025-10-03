import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import UploadCenterPage from "./pages/UploadCenterPage";
import AboutPage from "./pages/AboutPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SleepModelForm from "./pages/SleepModelForm";
import PredictCnn from "./pages/PredictCNN";
import CancerModel from "./pages/PredictANN";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/upload" element={<UploadCenterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sleep-assessment" element={<ProtectedRoute><SleepModelForm /></ProtectedRoute>} />
          <Route path="/brain-tumor-prediction" element={<ProtectedRoute><PredictCnn /></ProtectedRoute>} />
          <Route path="/cancer-risk-prediction" element={<ProtectedRoute><CancerModel /></ProtectedRoute>} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}