import React from "react";
import Selectors from "./components/Selectors";

export default function DashBoard() {
  return (
    <section id="dashBoard" className="p-4 text-center font-semibold">
      <h1 className=" text-3xl ">good morning!</h1>
      <div className="pt-8 text">
        tuesday, january 2nd {new Date().getDate()}
      </div>
      <div className="flex justify-center p-4">
        <div className="w-1/2 border-b-2 border-black"></div>
      </div>
      <div className="text-xl">Daily Reflections</div>

      <div className="flex justify-around pt-10">
        {data.map((selector: selector, index) => (
          <Selectors text={selector.text} image={selector.image} key={index} />
        ))}
      </div>
    </section>
  );
}

type selector = { text: string; image: string };

const data = [
  { text: "your monthly journal", image: "/testing.png" },
  { text: "reflections", image: "" },
  { text: "breathing exercises", image: "" },
  { text: "yearly tracker", image: "" },
];
