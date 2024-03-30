"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const checkEmail = async () => {
    try {
      await axios.post("/api/users/checkEmail", { email });
      setEmailSent(true);
    } catch (error: any) {
      return console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div>
        <label htmlFor="">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {emailSent && <div>Please check your email</div>}

      <button onClick={checkEmail} disabled={email.length === 0}>
        Continue
      </button>
    </div>
  );
}
