import React from "react";
import UploadCenterCard from "../components/UploadCenterCard.jsx";
import StepsGuide from "../components/StepsGuide.jsx";
import {
  MoveRight,
  Heart,
  Activity,
  Brain,
  FileText,
  Image,
  Upload,
} from "lucide-react";

export default function UploadCenterPage() {
  return (
    <div className="bg-white flex flex-col justify-center mt-7 md:mt-9">
      <div className="bg-[#dee9fc] border mx-auto rounded-full max-w-fit p-3">
        <Upload
          size={35}
          className="text-[#3662e3cc] items-center font-extrabold"
        />
      </div>

      <h1 className=" font-bold text-center text-3xl md:text-4xl mt-6">
        Upload Center
      </h1>
      <p className="text-center mx-auto mt-4 text-xl text-gray-500 w-[275px] md:w-[800px] mb-11">
        Choose your analysis type and provide the necessary information for
        AI-powered health predictions. All data is processed securely and used
        for educational purposes only.
      </p>
      <div className="md:flex-row flex flex-col">
        <UploadCenterCard
          title="Sleep Disorder Analysis"
          description="Input your lifestyle and health data for sleep pattern analysis"
          inputType="Form Input"
          InputIcon={FileText}
          time="2-3 minutes"
          ctaText="Start Analysis"
          Icon={MoveRight}
          iconColor="#22c55e"
          iconBg="#dcfce7"
          bgColor="#f0fdf4"
          CtaIcon={Heart}
          ctaColor="#16a34a"
          linkTo="/sleep-assessment"
        />

        <UploadCenterCard
          title="Brain Tumor Detection"
          description="Upload MRI scans for AI-powered tumor detection"
          inputType="Image Input"
          InputIcon={Image}
          time="1-2 minutes"
          ctaText="Start Analysis"
          Icon={MoveRight}
          iconColor="#a855f7"
          iconBg="#f3e8ff"
          bgColor="#faf5ff"
          CtaIcon={Brain}
          ctaColor="#9333ea"
          linkTo="/brain-tumor-prediction"
        />
        <UploadCenterCard
          title="Cancer Risk Assessment"
          description="Provide medical data for  MRI scans for AI-powered tumor detection"
          inputType="Image Input"
          InputIcon={FileText}
          time="1-2 minutes"
          ctaText="Start Analysis"
          iconColor="#f97316"
          iconBg="#ffedd5"
          bgColor="#fff7ed"
          Icon={MoveRight}
          CtaIcon={Activity}
          ctaColor="#ea580c"
        />
      </div>
      <div className="font-bold text-center text-3xl mt-7 mb-5">
        How It Works
      </div>
      <div className="pb-9 flex md:flex-row flex-col md:gap-11 mx-auto mb-8">
        <StepsGuide
          stepNumber="1"
          step="Choose Service"
          description="Select the type of analysis you need"
        />
        <StepsGuide
          stepNumber="2"
          step="Provide Data"
          description="Upload images or fill out forms"
        />
        <StepsGuide
          stepNumber="3"
          step="AI Analysis"
          description="Our models process your information"
        />
        <StepsGuide
          stepNumber="4"
          step="Get Results"
          description="View predictions and recommendations"
        />
      </div>
    </div>
  );
}
