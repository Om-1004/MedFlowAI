import React, { useState, useEffect } from "react";
import ServicesCard from "../components/ServicesCard";
import { Activity, Brain, Heart } from "lucide-react";
import { FaPython } from "react-icons/fa";
import { SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, SiKeras } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbFileDownload } from "react-icons/tb";

export default function ServicesPage() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl text-center font-bold md:text-4xl">
        Our AI Services
      </h2>
      <p className="text-center text-gray-500 mt-5 md:mt-2 md:w-[600px] mx-auto">
        Explore our comprehensive suite of AI-powered healthcare prediction
        tools. Each service uses advanced machine learning to provide
        educational insights.
      </p>
      <div className="mt-8">
        <ServicesCard
          title="Sleep Disorder Prediction"
          description="Analyze your sleep patterns and lifestyle factors to predict potential sleep disorders."
          Icon={Heart}
          iconColor="#22c55e"
          iconBg="#dcfce7"
          bgColor="#f0fdf4"
          ctaText="Start Analysis"
          ctaColor="#16a34a"
          linkTo="/sleep-assessment"
          requiredInputs={[
            "Age, Gender, Occupation",
            "Sleep duration and quality",
            "Physical activity levels",
            "Stress levels and BMI",
            "Blood pressure and heart rate",
          ]}
          keyFeatures={[
            "Lifestyle data analysis",
            "Sleep quality assessment",
            "Personalized recommendations",
            "Risk factor identification",
          ]}
          techs={[
            { name: "Python", icon: <FaPython className="text-yellow-400" /> },
            { name: "Pandas", icon: <SiPandas className="text-indigo-500" /> },
            { name: "NumPy", icon: <SiNumpy className="text-blue-500" /> },
            {
              name: "Scikit-Learn",
              icon: <SiScikitlearn className="text-orange-500" />,
            },
            {
              name: "Imbalanced-learn",
              icon: <GiArtificialIntelligence className="text-pink-500" />,
            },
            {
              name: "Joblib",
              icon: <TbFileDownload className="text-green-500" />,
            },
          ]}
          reverse={true}
        />
        <ServicesCard
          title="Brain Tumor Detection"
          description="Upload MRI scans for AI-powered analysis to detect potential brain tumor indicators."
          Icon={Brain}
          iconColor="#a855f7"
          iconBg="#f3e8ff"
          bgColor="#faf5ff"
          ctaText="Start Analysis"
          ctaColor="#9333ea"
          linkTo="/brain-tumor-prediction"
          requiredInputs={[
            "MRI scan upload (JPG/PNG/DICOM)",
            "Image quality verification",
            "Automated preprocessing",
            "CNN-based feature extraction",
            "Multi-class tumor classification",
          ]}
          keyFeatures={[
            "MRI image analysis",
            "Advanced AI detection",
            "Detailed visual reports",
            "Confidence scoring",
          ]}
          techs={[
            { name: "Python", icon: <FaPython className="text-yellow-400" /> },
            { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
            { name: "Keras", icon: <SiKeras className="text-red-500" /> },
            { name: "NumPy", icon: <SiNumpy className="text-blue-500" /> },
            {
              name: "MobileNetV2",
              icon: <GiArtificialIntelligence className="text-purple-500" />,
            },
          ]}
        />

        <ServicesCard
          title="Cancer Risk Assessment"
          description="Evaluate cancer severity and risk factors based on medical data and lab results."
          Icon={Activity}
          iconColor="#f97316"
          iconBg="#ffedd5"
          bgColor="#fff7ed"
          ctaText="Start Analysis"
          ctaColor="#ea580c"
          linkTo="/cancer-risk-prediction"
          requiredInputs={[
            "Patient demographics (Age, Gender, Location)",
            "Cancer type and stage classification",
            "Risk factors (Genetic, Environmental, Lifestyle)",
            "Treatment cost and survival data",
            "Health metrics (Smoking, Alcohol, Obesity)",
          ]}
          keyFeatures={[
            "Comprehensive risk analysis",
            "Multi-factor evaluation",
            "Severity scoring system",
            "Survival prediction modeling",
          ]}
          techs={[
            { name: "Python", icon: <FaPython className="text-yellow-400" /> },
            { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
            { name: "Keras", icon: <SiKeras className="text-red-500" /> },
            { name: "Pandas", icon: <SiPandas className="text-indigo-500" /> },
            { name: "NumPy", icon: <SiNumpy className="text-blue-500" /> },
            {
              name: "Scikit-Learn",
              icon: <SiScikitlearn className="text-orange-500" />,
            },
            {
              name: "Joblib",
              icon: <TbFileDownload className="text-green-500" />,
            },
          ]}
          reverse={true}
        />
      </div>
    </div>
  );
}