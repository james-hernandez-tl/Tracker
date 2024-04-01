import React from "react";
import Selectors from "./components/Selectors";
import selector from "@/types/selector";

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
          <Selectors
            text={selector.text}
            image={selector.image}
            url={selector.url}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

const data = [
  {
    text: "your monthly journal",
    image: "/testing.png",
    url: "/monthly/moods",
  },
  { text: "reflections", image: "", url: "/monthly/moods" },
  { text: "breathing exercises", image: "", url: "/monthly/moods" },
  { text: "yearly tracker", image: "", url: "/monthly/moods" },
];
