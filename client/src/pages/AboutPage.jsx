import React from "react";
import { Target, Cpu } from "lucide-react";
import UploadCenterCard from "../components/UploadCenterCard.jsx";

export default function AboutPage() {
  return (
    <div>
      <div className="text-center text-3xl mt-11 font-bold">
        About MedFlowAI
      </div>
      <div className="md:ml-11 md:mr-11 md:text-lg text-center mt-4 text-lg ml-6 pb-11 mr-6 text-gray-700">
        An educational platform exploring the intersection of artificial
        intelligence and healthcare prediction
      </div>
      <div className=" pt-1 pb-9">
        <div className="bg-[#dee9fc] border w-fit mx-auto rounded-full max-w-fit p-3 mt-7">
          <Target size={35} className="text-[#3662e3cc] font-extrabold" />
        </div>

        <p className="text-center text-2xl mt-3 font-bold">Our Mission</p>
        <p className="text-center mx-auto mt-3 w-[200px] text-lg pb-9 md:w-[800px] text-gray-700">
          To demonstrate the potential of AI in healthcare through educational
          tools that showcase machine learning applications in medical
          prediction and diagnosis.
        </p>
      </div>
      <div className="bg-[rgb(239,243,254)] py-9 md:mb-10 max-w-[1200px] mx-auto rounded-xl">
        <p className="text-center mx-auto text-2xl font-bold">
          Technology & Approach
        </p>
        <div className="md:flex-row flex flex-col md:justify-around">
          <div className="">
            <p className="font-semibold pt-6 text-center text-xl pb-3 md:text-left md:ml-6 md:mr-11 ">
              Machine Learning Models
            </p>
            <div className="text-center md:text-left ml-6 mr-6">
              <p className="text-center pb-5 md:text-left text-gray-700 ">
                Our educational platform utilizes various machine learning
                approaches to demonstrate different aspects of healthcare
                prediction:
              </p>
              <p className="pb-2 ml-3 mr-3 ">
                • Classification algorithms for sleep disorder prediction
              </p>
              <p className="pb-2 ml-3 mr-3">
                • Convolutional Neural Networks for medical image analysis
              </p>
              <p className="pb-2 ml-3 mr-3">
                • Ensemble methods for cancer risk assessment
              </p>
              <p className="pb-2 ml-3 mr-3">
                • Feature engineering for health data processing
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold pt-6 text-center text-xl pb-3 md:text-left md:ml-6 md:mr-11">
              Platform Features
            </p>
            <div className="text-center md:text-left ml-6 mr-6 md:ml-6 md:mr-11">
              <p className="text-center pb-5 md:text-left text-gray-700">
                Built with modern web technologies to provide a professional and
                educational user experience:
              </p>
              <p className="pb-2 ml-3 mr-3">
                • React-based responsive interface
              </p>
              <p className="pb-2 ml-3 mr-3">
                • Secure data handling and processing
              </p>
              <p className="pb-2 ml-3 mr-3">
                • Interactive prediction dashboards
              </p>
              <p className="pb-2 ml-3 mr-3">
                • Educational content and disclaimers
              </p>
            </div>
          </div>
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
