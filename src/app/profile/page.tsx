"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    };
    getUserDetails();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <div
        className="px-4 py-2 bg-sky-400 w-fit cursor-pointer hover:bg-sky-500"
        onClick={logout}
      >
        logout
      </div>
      {data && (
        <Link
          href={`/profile/${data}`}
          className="px-4 py-2 bg-sky-400 w-fit cursor-pointer hover:bg-sky-500"
        >
          Users profile
        </Link>
      )}
    </div>
  );
}
