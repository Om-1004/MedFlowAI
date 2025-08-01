import React from "react";

export default function FeatureCard({ Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center max-w-xs mx-auto">
      <div className="bg-[#eaf0ff] p-4 rounded-full mb-3">
        <Icon className="text-[#2c5eea] w-7 h-7 md:w-9 md:h-9" />
      </div>
      <h4 className="font-semibold text-xl md:text-xl">{title}</h4>
      <p className="font-light text-sm md:text-base mt-2">{description}</p>
    </div>
  );
}
