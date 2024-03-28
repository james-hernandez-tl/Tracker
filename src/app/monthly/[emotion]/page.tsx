import React from "react";
import Square from "@/app/components/Square";

export default function Monthly({ params }: { params: { emotion: string } }) {
  return (
    <section id="Monthly">
      <div className="w-fit">
        <h1 className="text-5xl font-semibold">
          Lets talk... {params.emotion}.
        </h1>
        <div className="w-full text-right text-xl">How did you feel today?</div>
      </div>

      <div className="flex justify-between">
        <div>GRID</div>
        <div>
          <div className="text-xl">
            <div>Choose an emotion option</div>
            <div>that describes your day.</div>
          </div>
          <div className="flex-col gap-2 flex pt-4">
            {data.map((option, index) => (
              <div className="flex gap-2 content-end" key={index}>
                <Square />
                <div className="h-min">{option}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const data = [
  "Happy, Joyful, Relaxed, Content, Great",
  "Sad, Lonely, Depressed, Insecure, Numb",
  "Energetic, Productive, Active, Motivated, Alive",
  "Sick, Tired, Unmotivated, Bored, Dull",
  "Neutral, Average, Normal, Uneventful, Good",
  "Angry, Anxious, Frustrated, Annoyed, Grumpy",
];
