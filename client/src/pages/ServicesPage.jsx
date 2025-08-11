import React from "react";
import ServicesCard from "../components/ServicesCard";
import { Activity, Brain, Heart } from "lucide-react";
import { FaPython } from "react-icons/fa";
import { SiPandas, SiNumpy, SiScikitlearn } from "react-icons/si";
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
          requiredInputs={[
            "MRI scan upload (JPG/PNG)",
            "Image quality verification",
            "Automated preprocessing",
            "Multiple view analysis",
          ]}
          keyFeatures={[
            "MRI image analysis",
            "Advanced AI detection",
            "Detailed visual reports",
            "Confidence scoring",
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
          requiredInputs={[
            "Age, Gender, Cancer type",
            "Tumor size and stage",
            "Blood cell counts",
            "Hemoglobin levels",
            "Additional lab markers",
          ]}
          keyFeatures={[
            "Comprehensive risk analysis",
            "Lab result interpretation",
            "Severity scoring",
            "Trend monitoring",
          ]}
          reverse={true}
        />
      </div>
    </div>
  );
}
