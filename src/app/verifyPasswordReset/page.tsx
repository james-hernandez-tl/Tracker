"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyPasswordReset() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const verifyUserPassword = async () => {
    try {
      await axios.post("/api/users/verifyPasswordReset", { token, password });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("Password change failed");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-4xl">Change Password</h1>
      <h2 className="p-2 mb-2 bg-red-500">{token ? `${token}` : "no token"}</h2>
      <div className="flex gap-1">
        <label htmlFor="">New password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-black border-2 rounded-md px-2 mb-2"
        />
      </div>
      <button
        disabled={token.length === 0 || password.length === 0}
        className={`px-4 py-1 mt-2  rounded-sm cursor-pointer  ${
          token.length === 0 || password.length === 0
            ? "bg-gray-400 hover:bg-gray-400"
            : "bg-green-400 hover:bg-green-500"
        }`}
        onClick={verifyUserPassword}
      >
        Update Password
      </button>

      {verified && (
        <div>
          <h2>Password Updated</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl text-red-600">{error}</h2>
        </div>
      )}
    </div>
  );
}
