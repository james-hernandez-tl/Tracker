"use client";
import React from "react";
import { useShowDates } from "@/providers/showDateProvider";

export default function DateInput() {
  const { showDates, setShowDates } = useShowDates();
  return (
    <input
      type="checkbox"
      checked={showDates}
      onClick={(e) => setShowDates((state) => !state)}
    />
  );
}
