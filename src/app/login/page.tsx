"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    credential: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const onLogin = async () => {
    console.log("ran login");
    try {
      const res = await axios.post("api/users/login", user);
      console.log(res.data);

      toast.success("Logged in");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error("login failed");
    }
  };

  useEffect(() => {
    if (user.credential.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else setBtnDisabled(true);
  }, [user]);

  return (
    <div className="flex flex-col">
      <h1>Login</h1>
      <label htmlFor="username">Email or Username</label>
      <input
        id="credential"
        type="text"
        value={user.credential}
        onChange={(e) => setUser({ ...user, credential: e.target.value })}
      />
      <label htmlFor="username">password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onLogin}>Login</button>
      <Link href="/signup">Don't have an account? Signup</Link>
    </div>
  );
}
