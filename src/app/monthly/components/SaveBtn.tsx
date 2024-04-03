"use client";
import React from "react";
import { Emotion } from "../[emotion]/page";
import { useOptions } from "@/providers/optionContext";
import { useDate } from "@/providers/dateProvider";
import createUserMood from "../serverFunctions/createUserMood";

export default function SaveBtn({
  topic,
  data,
}: {
  topic: Emotion;
  data: any;
}) {
  const { selectedDate, setSelectedDate } = useDate();
  const { option, setOption } = useOptions();

  const handleClick = () => {
    if (!selectedDate || !option) {
      return;
    }

    const exist = data[""];
    switch (topic) {
      case "moods":
        if (exist) return;
        return;
    }
  };

  return (
    <button className="py-1 px-3 bg-sky-500 text-white rounded hover:bg-sky-600">
      Save
    </button>
  );
}
