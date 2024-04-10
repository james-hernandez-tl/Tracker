"use client";
import React from "react";
import { useDate } from "@/providers/dateProvider";
import { useOptions } from "@/providers/optionContext";
import { useShowDates } from "@/providers/showDateProvider";

export default function Square({
  choice = "default",
  date,
  clickable,
}: params) {
  const { selectedDate, setSelectedDate } = useDate();
  const { option, setOption } = useOptions();
  const { showDates } = useShowDates();

  const handleClick = () => {
    if (!clickable) return;

    if (date) {
      setSelectedDate(date);
      if (date !== selectedDate) setOption("");
    } else {
      setOption(choice);
    }
  };

  const isSelected = date === selectedDate || (!date && choice === option);
  if (date === selectedDate && option) {
    choice = option;
  }

  return (
    <div
      className={`w-11 h-11 min-w-[2.75rem] bg-basic-${choice} relative flex justify-center items-center ${
        clickable && "hover:outline-purple-400 hover:outline cursor-pointer"
      } ${isSelected && "outline-purple-500 outline outline-[2px]"}`}
      onClick={handleClick}
    >
      {showDates && date?.slice(7)}
    </div>
  );
}

type params = {
  choice: string;
  date?: string;
  clickable: boolean;
};
