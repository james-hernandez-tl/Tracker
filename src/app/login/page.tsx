"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import handleInputErrorAnimation from "@/helpers/handleInputErrorAnimation";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [user, setUser] = useState({
    credential: "",
    password: "",
  });

  const passwordRef = useRef<HTMLInputElement>(null);
  const credentialRef = useRef<HTMLInputElement>(null);

  const onLogin = async () => {
    if (btnDisabled) {
      let errorMessage = "";
      if (!user.password && !user.credential) {
        errorMessage = "Please give an email and a password";
        handleInputErrorAnimation(passwordRef);
        handleInputErrorAnimation(credentialRef);
      } else if (!user.password) {
        errorMessage = "Please input a password";
        handleInputErrorAnimation(passwordRef);
      } else {
        errorMessage = "please input an email";
        handleInputErrorAnimation(credentialRef);
      }
      toast.error(errorMessage);
      return;
    }
    try {
      const res = await axios.post("api/users/login", user);

      toast.success("Logged in");
      router.push("/profile");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;

      if (errorMessage === "Incorrect password") {
        handleInputErrorAnimation(passwordRef);
      } else if (errorMessage === "User does not exist") {
        handleInputErrorAnimation(credentialRef);
      }
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (user.credential.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else setBtnDisabled(true);
  }, [user]);

  return (
    <div className="flex flex-col  items-center min-h-screen">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold">Login</h1>
      <label htmlFor="credential">Email or Username</label>
      <input
        id="credential"
        type="text"
        value={user.credential}
        onChange={(e) => setUser({ ...user, credential: e.target.value })}
        className="border-black border-2 rounded-md px-2"
        ref={credentialRef}
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border-black border-2 rounded-md px-2 "
        ref={passwordRef}
      />
      <button
        onClick={onLogin}
        className={`px-4 py-1 mt-2  rounded-sm cursor-pointer  ${
          btnDisabled
            ? "bg-gray-400 hover:bg-gray-400"
            : "bg-green-400 hover:bg-green-500"
        }`}
      >
        Login
      </button>
      <div className="flex gap-1">
        <span>Don't have an account?</span>
        <Link
          href="/signup"
          className="text-blue-400 hover:text-blue-500 cursor-pointer"
        >
          Signup
        </Link>
      </div>

      <div className="flex gap-1">
        <span>Forgot password?</span>
        <Link
          href="/forgotPassword"
          className="text-blue-400 hover:text-blue-500 cursor-pointer"
        >
          Reset password
        </Link>
      </div>
    </div>
  );
}
