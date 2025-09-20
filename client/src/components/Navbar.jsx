import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  LogIn,
  UserPlus2,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userPool } from "../auth/cognitoConfig";
import { signOutState } from "../redux/user/userSlice";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Upload Center", path: "/upload" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const handleLogout = () => {
    if (userPool.getCurrentUser()) {
      userPool.getCurrentUser().signOut();
    }
    dispatch(signOutState());
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center text-black py-3 px-6 md:px-12 bg-white drop-shadow-md relative z-10">
      <button
        onClick={() => navigate("/")}
        className="flex gap-2 items-center text-left"
      >
        <Activity
          size={32}
          className="hover:scale-105 transition-all text-[#1A73E8]"
        />
        <h1 className="text-lg md:text-xl font-semibold">MedFlowAI</h1>
      </button>

      <ul className="hidden xl:flex items-center gap-10 font-light text-base">
        {navItems.map(({ name, path }) => (
          <li
            key={name}
            onClick={() => navigate(path)}
            className="cursor-pointer text-lg hover:text-blue-600 transition"
          >
            {name}
          </li>
        ))}
      </ul>

      <div className="hidden xl:flex items-center gap-6">
        {!user.userName ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 hover:text-blue-700 transition"
            >
              <LogIn size={20} />
              <span className="font-medium">Login</span>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <UserPlus2 size={20} />
              <span className="font-medium">Sign Up</span>
            </button>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <span className="font-medium">Welcome, {user.userName}</span>
              <ChevronDown size={18} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-20">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className="xl:hidden cursor-pointer"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {isOpenMenu ? <X size={28} /> : <Menu size={28} />}
      </div>

      {isOpenMenu && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 xl:hidden">
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

          {/* Mobile Auth Controls */}
          {!user.userName ? (
            <div className="flex flex-col gap-3 w-2/3">
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
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpenMenu(false);
              }}
              className="flex items-center justify-center gap-2 text-red-600 border border-red-600 py-2 rounded-md w-2/3"
            >
              <LogOut size={20} /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
