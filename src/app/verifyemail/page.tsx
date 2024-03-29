"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifiyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifiyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center p-2 min-h-screen">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-red-500">{token ? `${token}` : "no token"}</h2>

      {verified && (
        <div>
          <h2>Email Verified</h2>
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
