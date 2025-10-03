import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user.displayName;
      dispatch(signInSuccess(user));
      navigate("/")

    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  //   const handleFacebookSignIn = async () => {
  //     const provider = new FacebookAuthProvider();
  //     try {
  //       const result = await signInWithPopup(auth, provider);
  //       const user = result.user;
  //       console.log('Facebook user:', user);
  //     } catch (error) {
  //       console.error('Facebook sign-in error:', error);
  //     }
  //   };

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="mr-2" />
        <span className="text-sm font-medium">Google</span>
      </button>
      <button
        // onClick={handleFacebookSignIn}
        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FaFacebookF className="mr-2 text-[#1877F2]" />
        <span className="text-sm font-medium">Facebook</span>
      </button>
    </div>
  );
}
