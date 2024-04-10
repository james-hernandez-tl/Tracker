import React from "react";
import Square from "@/app/components/Square";

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
    <div className="grid grid-cols-7 auto-rows-min gap-x-2 gap-y-2">
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

  const currentDay = new Date().getDate();

  return day <= currentDay && day >= currentDay - 2;
}
