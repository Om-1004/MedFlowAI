import {
  Heart,
  Brain,
  Activity,
  Upload,
  FlaskConical,
  User,
} from "lucide-react";
import React from "react";
import FeatureCard from "./FeatureCard";

import HeroServiceCard from "./HeroServiceCard";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const features = [
    {
      Icon: Upload,
      title: "Easy to Use",
      description:
        "Simple, intuitive interface designed for users of all technical backgrounds.",
    },
    {
      Icon: User,
      title: "Educational Focus",
      description:
        "Designed for learning and exploration, not as a replacement for medical advice.",
    },
    {
      Icon: FlaskConical,
      title: "Science-Based Approach",
      description:
        "Grounded in research and evidence to support better learning and understanding.",
    },
  ];

  return (
    <div className="">
      <div className="bg-[#f5f9ff] min-h-[65vh] md:min-h-[60vh] flex flex-col items-center justify-center px-4 text-center py-5">
        <h1 className="font-bold text-4xl md:text-[60px] text-center leading-[1.2] md:leading-[1.1]">
          <span className="block md:inline">AI-Powered </span>
          <span className="block md:inline">Healthcare</span>
          <br className="hidden md:block" />
          <span className="block text-[#2c5eea]">Predictions</span>
        </h1>

        <p className="mt-6 text-gray-700 text-base md:w-[1200px] md:text-xl max-w-3xl font-normal">
          Explore the future of healthcare with our educational AI platform. Get
          insights into sleep disorders, brain tumor detection, and cancer risk
          assessment.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto mt-8">
          <button className="w-full md:w-auto bg-[#2c5eea] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition" onClick={() => navigate("/services")}>
            Explore Services
          </button>
          <button className="w-full md:w-auto text-[#2c5eea] border border-[#2c5eea] hover:bg-[#eaf0ff] font-semibold px-6 py-3 rounded-md transition" onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-10 md:mt-16 px-4">
        <h2 className="font-semibold text-2xl text-center md:text-4xl md:font-bold">
          Our AI Services
        </h2>
        <p className="mt-4 font-light text-center md:text-xl">
          Advanced machine learning models for healthcare predictions
        </p>

        <div className="mt-10 flex flex-col md:flex-row md:items-stretch items-center md:justify-center gap-6 md:gap-8 px-4">
          <HeroServiceCard
            title="Sleep Disorder Prediction"
            description="Analyze lifestyle factors and health metrics to predict potential sleep disorders and improve sleep quality."
            Icon={Heart}
            iconColor="#22c55e"
            iconBg="#dcfce7"
            bgColor="#f0fdf4"
            ctaColor="#16a34a"
            ctaText="Start Analysis"
          />

          <HeroServiceCard
            title="Brain Tumor Detection"
            description="Upload MRI scans for AI-powered analysis to detect potential brain tumor indicators."
            Icon={Brain}
            iconColor="#a855f7"
            iconBg="#f3e8ff"
            bgColor="#faf5ff"
            ctaColor="#9333ea"
            ctaText="Upload Scan"
          />

          <HeroServiceCard
            title="Cancer Risk Assessment"
            description="Evaluate cancer severity and risk factors based on medical data and laboratory results."
            Icon={Activity}
            iconColor="#f97316"
            iconBg="#ffedd5"
            bgColor="#fff7ed"
            ctaColor="#ea580c"
            ctaText="Begin Assessment"
          />
        </div>
      </div>

      <div className="mt-12 px-4 md:px-32 text-center bg-[#F9FAFB] py-10 md:py-20">
        <h2 className="font-semibold text-3xl md:text-4xl leading-tight">
          Why Choose <br className="block md:hidden" />
          HealthAI?
        </h2>
        <p className="mt-4 md:mt-2 font-light text-md md:text-lg max-w-xl mx-auto">
          Built with cutting-edge technology and educational focus
        </p>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:justify-between">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      <div className="bg-[#FEFCEA] mx-auto text-center py-12 md:py-16 px-4 md:px-16">
        <h3 className="text-2xl font-semibold text-[#7D501F] mb-4">
          Important Notice
        </h3>
        <p className="text-[#7D501F] text-base leading-relaxed max-w-3xl mx-auto">
          This is a personal project created for educational purposes. The
          predictions provided are not real medical advice and should not
          replace consultation with licensed healthcare professionals.
        </p>
      </div>
    </div>
  );
}
