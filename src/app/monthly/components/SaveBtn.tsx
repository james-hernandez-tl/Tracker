"use client";
import React from "react";
import { Emotion } from "../[emotion]/page";
import { useOptions } from "@/providers/optionContext";
import { useDate } from "@/providers/dateProvider";
import toast from "react-hot-toast";
import axios from "axios";
import refreshPath from "@/helpers/refreshPath";

export default function SaveBtn({
  topic,
  data,
}: {
  topic: Emotion;
  data: any;
}) {
  const { selectedDate } = useDate();
  const { option } = useOptions();
  const visible = selectedDate && option;

  const handleClick = async () => {
    try {
      const exist = data[selectedDate];
      const url = `/api/${topic}`;

      if (exist) {
        await axios.put(url, { ...exist, choice: option });
        toast.success("mood updated!");
      } else {
        await axios.post(url, { date: selectedDate, choice: option });
        toast.success("mood created!");
      }
      return await refreshPath("/monthly/moods");
    } catch (error: any) {
      return toast.error("couldn't create mood");
    }
  };

  return (
    <>
      {visible && (
        <button
          onClick={handleClick}
          className="py-1 px-3 bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          Save
        </button>
      )}
    </>
  );
}
