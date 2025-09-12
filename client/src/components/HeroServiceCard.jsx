import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroServiceCard({
  title,
  description,
  Icon,
  iconColor,
  bgColor,
  iconBg,
  ctaText,
  ctaColor,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-2xl p-6 w-full max-w-md shadow-sm md:p-8 md:w-[800px] flex flex-col justify-between"
      style={{
        backgroundColor: bgColor,
        minHeight: "320px",
      }}
    >
      <div className="flex flex-col md:items-start items-center text-center md:text-left grow">
        <div
          className="p-4 rounded-full mb-4 md:mx-0 mx-auto"
          style={{ backgroundColor: iconBg }}
        >
          <Icon
            className="w-6 h-6 md:w-10 md:h-10"
            style={{ color: iconColor }}
          />
        </div>

        <h3 className="text-xl font-semibold md:text-2xl text-black">
          {title}
        </h3>

        <p className="text-gray-600 text-md mt-3 md:text-base">{description}</p>

        <div className="hidden md:block flex-grow" />

        <div className="mt-14 md:mt-4 flex items-center space-x-2 cursor-pointer md:justify-start justify-center group">
          <button
            className="font-semibold text-sm md:text-base transition-colors duration-300 group-hover:underline"
            style={{ color: ctaColor }}
            onClick={() => navigate("/sleep-assessment")}
          >
            {ctaText}
          </button>
          <span
            style={{ color: ctaColor }}
            className="text-lg transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}
