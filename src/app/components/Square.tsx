"use client";
import React from "react";
import { useDate } from "@/providers/dateProvider";
import { useOptions } from "@/providers/optionContext";

export default function Square({
  choice = "default",
  date,
  clickable,
}: params) {
  const { selectedDate, setSelectedDate } = useDate();
  const { option, setOption } = useOptions();

  const handleClick = () => {
    if (date) {
      setSelectedDate(date);
    } else {
      setOption(choice);
    }
  };

  const isSelected =
    (date && date === selectedDate) || (!date && choice === option);

  return (
    <div
      className={`w-10 h-10 bg-basic-${choice} relative ${
        clickable && "hover:outline-purple-400 hover:outline "
      } ${isSelected && "outline-purple-500 outline outline-[2px] "}`}
      onClick={handleClick}
    ></div>
  );
}

type params = {
  choice: string;
  date?: string;
  clickable: boolean;
};
