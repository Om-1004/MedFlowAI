import React from "react";

export default function StepsGuide({ stepNumber, step, description }) {
  return (
    <div>
      <div className="md:text-xl flex justify-center flex-col bg-[#dee8fc] my-auto text-center md:w-[75px] md:h-[75px] h-30 w-30 font-semibold mt-6 mx-auto border rounded-full w-fit pl-5 pr-5 pt-3 pb-3 text-[#3863e3]">
        {stepNumber}
      </div>
      <div className="md:text-lg text-center mt-3 font-semibold">{step}</div>
      <div className="text-gray-700 md:text-md text-sm text-center mt-2">
        {description}
      </div>
    </div>
  );
}
