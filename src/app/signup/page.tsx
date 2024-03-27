"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
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

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
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
    <div className="flex flex-col">
      <Toaster />
      <h1>Signup</h1>
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        className="text-black"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="username">email</label>
      <input
        id="email"
        type="text"
        className="text-black"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="username">password</label>
      <input
        id="password"
        type="password"
        className="text-black"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onSignup}>Signup here</button>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}
