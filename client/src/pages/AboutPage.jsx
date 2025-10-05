import React from "react";
import { Target, Cpu, Brain, Shield, Zap, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About MedFlowAI
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An educational platform exploring the intersection of artificial
            intelligence and healthcare prediction
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-600 rounded-xl p-5 mb-8">
            <Target size={40} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          
          <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
            To demonstrate the potential of AI in healthcare through educational
            tools that showcase machine learning applications in medical
            prediction and diagnosis.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Technology & Approach
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-600 rounded-lg p-3">
                  <Brain size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Machine Learning Models
                </h3>
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our educational platform utilizes various machine learning
                approaches to demonstrate different aspects of healthcare
                prediction:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Classification algorithms for sleep disorder prediction</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Convolutional Neural Networks for medical image analysis</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Ensemble methods for cancer risk assessment</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Feature engineering for health data processing</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 rounded-lg p-3">
                  <Code size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Platform Features
                </h3>
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                Built with modern web technologies to provide a professional and
                educational user experience:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">React-based responsive interface</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Secure data handling and processing</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Interactive prediction dashboards</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5"></div>
                  <p className="text-gray-800">Educational content and disclaimers</p>
                </div>
              </div>
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