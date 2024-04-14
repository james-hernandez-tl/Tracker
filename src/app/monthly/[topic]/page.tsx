import React from "react";
import Square from "@/app/components/Square";
import Grid from "../components/Grid";
import SaveBtn from "../components/SaveBtn";
import normalizeDates from "@/helpers/normalizeDates";
import getUsersMonthlyData from "../serverFunctions/getUsersMonthlyData";
import DateInput from "../components/DateInput";

export default async function Monthly({
  params,
}: {
  params: { topic: Topic };
}) {
  const monthlyData: any = await getUsersMonthlyData(params.topic);
  const data = normalizeDates(monthlyData);

  return (
    <section id="Monthly">
      <div className="w-fit relative">
        <h1 className="text-5xl font-medium text-[#FFB7B8] ">
          Lets talk... {params.topic}.
        </h1>
        <div className="w-full text-right text-xl text-[#FFB7B8] absolute -bottom-7 italic">
          How did you feel today?
        </div>
      </div>

      <div className="text-xl text-[#FFB7B8] w-full flex justify-end">
        <div className="max-w-20 max-w-xs italic font-medium">
          Choose an emotion option that describes your day.
        </div>
      </div>

      <div className="flex justify-between">
        <div className="relative h-fit">
          {getComponentForTopic(params.topic, data)}
          <div className="absolute bottom-0 right-0 flex gap-8 items-end">
            <SaveBtn topic={params.topic} data={data} />
            <DateInput />
          </div>
        </div>

        <div className="flex-col gap-2 flex pt-4 max-w-xs w-full">
          {topicOptions[params.topic].map(({ text, choice }, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <Square clickable={true} choice={choice} />
              <div className="flex break-words">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const topicOptions: TopicOptions = {
  moods: [
    { text: "Happy, Joyful, Relaxed, Content, Great", choice: "happy" },
    { text: "Sad, Lonely, Depressed, Insecure, Numb", choice: "sad" },
    {
      text: "Energetic, Productive, Active, Motivated, Alive",
      choice: "energetic",
    },
    { text: "Sick, Tired, Unmotivated, Bored, Dull", choice: "sick" },
    { text: "Neutral, Average, Normal, Uneventful, Good", choice: "neutral" },
    { text: "Angry, Anxious, Frustrated, Annoyed, Grumpy", choice: "angry" },
  ],
  health: [
    { text: "Well / Good", choice: "well" },
    { text: "Cold / Cough", choice: "cold" },
    { text: "Headache", choice: "headache" },
    { text: "Hangover", choice: "hangover" },
    { text: "Brain Fog", choice: "fog" },
  ],
  anxiety: [
    { text: "None", choice: "none" },
    { text: "Low", choice: "low" },
    { text: "Medium", choice: "medium" },
    { text: "High", choice: "high" },
    { text: "Extreme", choice: "extreme" },
  ],
};

type TopicOptions = {
  moods: optionData[];
  health: optionData[];
  anxiety: optionData[];
};

type optionData = {
  text: string;
  choice: string;
};

export type Topic = "moods" | "health" | "anxiety";

function getComponentForTopic(topic: Topic, data: any) {
  const GridTopics = ["moods", "health", "anxiety"];
  if (GridTopics.includes(topic)) {
    return <Grid data={data} />;
  }
}
