import React from "react";
import { Hourglass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadCenterCard({
  title,
  description,
  inputType,
  InputIcon,
  time,
  ctaText,
  ctaColor,
  Icon,
  iconColor,
  iconBg,
  bgColor,
  CtaIcon,
  linkTo
}) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full mb-8 h-fit mt-5 pb-7 pt-8 pl-7 pr-7 md:ml-7 md:mr-7 border rounded-2xl"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="flex flex-col  mx-auto justify-center border rounded-md w-fit p-3 items-center"
        style={{ backgroundColor: iconBg }}
      >
        <CtaIcon
          className="items-center w-7 h-7"
          style={{ color: iconColor }}
        />
      </div>
      <div className="text-center text-2xl font-bold mt-8">{title}</div>
      <div className="mx-auto text-center mt-3 text-md w-fit pl-6 pr-6">
        {description}
      </div>
      <div className="text-sm ">
        <div className="flex mt-6 gap-2 text-gray-500 justify-center">
          {InputIcon && <InputIcon size={20} />}
          {inputType}
          <Hourglass size={20} />
          {time}
        </div>
      </div>
      <button onClick={() => navigate(linkTo)}
        className="p-2 flex mx-auto text-white text-center border rounded-xl max-w-fit font-semibold px-6 py-3 mt-5 justify-center gap-2 items-center "
        style={{ backgroundColor: ctaColor }}
      >
        {ctaText}
        <Icon className="w-4 h-4"></Icon>
      </button>
    </div>
  );
}
