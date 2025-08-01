import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, LogIn, UserPlus2, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Upload Center", path: "/upload" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="">
      <header className="flex justify-between items-center text-black py-3 px-8 md:px-14 bg-white drop-shadow-md relative z-10">
        <div className="flex gap-2 items-center">
          <Activity
            size={35}
            className="hover:scale-105 transition-all text-[#1A73E8]"
          />
          <h1 className="text-xl font-semibold">MedFlowAI</h1>
        </div>

        <ul className="hidden xl:flex items-center gap-12 md:gap-3 font-light text-base">
          {navItems.map(({ name, path }) => (
            <li
              key={name}
              onClick={() => navigate(path)}
              className="text-xl md:text-base p-3 hover:scale-105 rounded-md transition-all cursor-pointer"
            >
              {name}
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex gap-5 md:gap-10">
          <div className="flex items-center gap-6">
            <div
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-700 transition"
            >
              <LogIn className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-base md:text-md font-medium">Login</span>
            </div>

            <div
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 md:gap-1 px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition"
            >
              <UserPlus2 className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-base md:text-md font-medium">Sign Up</span>
            </div>
          </div>
        </div>

        <div
          className="xl:hidden cursor-pointer"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <X size={30} /> : <Menu size={30} />}
        </div>

        {isOpenMenu && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 xl:hidden">
            <ul className="flex flex-col gap-4 items-center font-light text-lg w-full">
              {navItems.map(({ name, path }) => (
                <li
                  key={name}
                  onClick={() => {
                    navigate(path);
                    setIsOpenMenu(false);
                  }}
                  className="hover:bg-gray-100 w-full text-center py-2 cursor-pointer"
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-4 w-2/3">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpenMenu(false);
                }}
                className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-2 rounded-md"
              >
                <LogIn size={20} /> Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsOpenMenu(false);
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md"
              >
                <UserPlus2 size={20} /> Sign Up
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
