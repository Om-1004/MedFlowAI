import React from "react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ServicesCard({
  title,
  description,
  Icon,
  iconColor,
  bgColor,
  iconBg,
  ctaText,
  ctaColor,
  requiredInputs,
  keyFeatures,
  reverse = false,
  techs,
  linkTo,
  disabled = false,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div
        className="rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 text-center lg:text-left max-w-lg">
            <div
              className="inline-flex p-4 rounded-xl mb-6"
              style={{ backgroundColor: iconBg }}
            >
              <Icon className="w-7 h-7" style={{ color: iconColor }} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {description}
            </p>

            {keyFeatures?.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 justify-center lg:justify-start"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: iconColor }}
                      ></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ctaText && (
              <button
                onClick={() => {
                  if (!disabled && linkTo) navigate(linkTo);
                }}
                disabled={disabled}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200
    ${
      disabled
        ? "bg-gray-400 cursor-not-allowed opacity-60"
        : "hover:shadow-lg hover:scale-105 active:scale-95"
    }`}
                style={{ backgroundColor: disabled ? "#9ca3af" : ctaColor }}
              >
                {ctaText}
                <MoveRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {requiredInputs?.length > 0 && (
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4 text-center lg:text-left">
                  Required Information
                </h4>
                <div className="space-y-3 mb-4">
                  {requiredInputs.map((input, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-semibold"
                        style={{ backgroundColor: ctaColor }}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {input}
                      </span>
                    </div>
                  ))}
                </div>

                {techs && techs.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {techs.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full"
                        >
                          {tech.icon}
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {ctaText && (
          <div className="lg:hidden text-center mt-8">
            <button
              onClick={() => {
                if (!disabled && linkTo) navigate(linkTo);
              }}
              disabled={disabled}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200
    ${
      disabled
        ? "bg-gray-400 cursor-not-allowed opacity-60"
        : "hover:shadow-lg hover:scale-105 active:scale-95"
    }`}
              style={{ backgroundColor: disabled ? "#9ca3af" : ctaColor }}
            >
              {ctaText}
              <MoveRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
