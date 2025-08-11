import React from "react";
import { Activity, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#121726] text-gray-300 px-6 py-16">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-4 md:w-full">
            <div className="flex items-center gap-2">
              <Activity className="text-blue-500 w-7 h-7" />
              <h4 className="text-white text-2xl font-bold">MedFlowAI</h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              A learning-focused AI healthcare assistant that demonstrates
              machine learning in medical predictions. Not intended for clinical
              use.
            </p>
            <p className="text-yellow-400 font-semibold text-sm mt-2">
              Educational Use Only
            </p>
            <p className="text-xs text-gray-500 max-w-xs">
              This platform is intended solely for educational purposes and is
              not a substitute for professional medical advice.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-4">
            <h4 className="text-white text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Home", "Services", "Upload Center", "About", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-4">
            <h4 className="text-white text-xl font-semibold">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>medflowai.co@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Toronto</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-16 pt-6 text-center text-sm text-gray-500">
        © 2025 MedFlowAI — Educational project created for learning purposes only.
      </div>
    </footer>
  );
}
