import React from "react";
import getUsersMoods from "../serverFunctions/getUsersMoods";
import createUserMood from "../serverFunctions/createUserMood";
import normalizeDates from "@/helpers/normalizeDates";
import Square from "@/app/components/Square";
import changeOption from "@/helpers/changeOption";

export default async function Grid({ data }: any) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month, 0).getDate();

  const allDates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    allDates.push(`${year}-${month + 1}-${i}`);
  }

  return (
    <div className="grid grid-cols-7 auto-rows-min gap-x-1 gap-y-1">
      {allDates.map((date) => (
        <Square
          choice={data[date]?.choice}
          key={date}
          clickable={isClient(date)}
          date={date}
        />
      ))}
    </div>
  );
}

function isClient(date: string) {
  const dayString = date.slice(7);
  const day = Number(dayString);

  const currentDay = new Date().getDay();

  return day <= currentDay && day >= currentDay - 2;
}
