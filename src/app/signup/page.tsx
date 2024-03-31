"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import handleInputErrorAnimation from "@/helpers/handleInputErrorAnimation";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [btnDisabled, setButtonDisabled] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const handleBtnDisabled = () => {
    if (!user.email) {
      handleInputErrorAnimation(emailRef);
    }

    if (!user.password) {
      handleInputErrorAnimation(passwordRef);
    }

    if (!user.username) {
      handleInputErrorAnimation(usernameRef);
    }

    toast.error("All inputs are required");
  };

  const onSignup = async () => {
    try {
      if (btnDisabled) {
        handleBtnDisabled();
        return;
      }

      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;
      console.log(error.response);
      if (errorMessage.includes("email")) {
        handleInputErrorAnimation(emailRef);
      } else if (errorMessage.includes("username")) {
        handleInputErrorAnimation(usernameRef);
      }
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (user.email.length && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col  items-center min-h-screen">
      <Toaster />
      <h1 className="text-2xl font-semibold">Signup</h1>
      <label htmlFor="username">username</label>
      <input
        id="username"
        ref={usernameRef}
        type="text"
        className="border-black border-2 rounded-md px-2"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="username">email</label>
      <input
        id="email"
        ref={emailRef}
        type="text"
        className="border-black border-2 rounded-md px-2"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="username">password</label>
      <input
        id="password"
        ref={passwordRef}
        type="password"
        className="border-black border-2 rounded-md px-2"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onSignup}
        className={`px-4 py-1 mt-2  rounded-sm cursor-pointer  ${
          btnDisabled
            ? "bg-gray-400 hover:bg-gray-400"
            : "bg-green-400 hover:bg-green-500"
        }`}
      >
        Signup here
      </button>
      <div>
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="text-blue-400 hover:text-blue-500 cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
