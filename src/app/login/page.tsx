"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    credential: "",
    password: "",
  });

  const onLogin = async () => {};
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
      <button onClick={onLogin}>Login here</button>
      <Link href="/signup">Don't have an account? Signup</Link>
    </div>
  );
}
