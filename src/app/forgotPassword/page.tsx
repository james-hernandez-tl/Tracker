"use client";
import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const timerRef: MutableRefObject<any> = useRef(null);
  const [timer, setTimer] = useState(0);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  const checkEmail = async () => {
    try {
      // await axios.post("/api/users/checkEmail", { email });
      setEmailSent(true);
      setTimer(300);

      const id = setInterval(() => {
        setTimer((state) => {
          if (state === 1 && timerRef.current) {
            clearInterval(timerRef.current);
          }
          return state - 1;
        });
      }, 1000);

      timerRef.current = id;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold">Reset Password</h1>

      <label htmlFor="">Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-black border-2 rounded-md px-2"
      />

      {emailSent && (
        <div className="text-green-400">
          <div>We've sent you an email to reset your password</div>
          <div>Wait {formatTime(timer)} before clicking the button again</div>
        </div>
      )}

      <button
        onClick={checkEmail}
        disabled={email.length === 0 || timer > 0}
        className={`px-4 py-1 mt-2  rounded-sm cursor-pointer  ${
          email.length === 0 || timer > 0
            ? "bg-gray-400 hover:bg-gray-400"
            : "bg-green-400 hover:bg-green-500"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
