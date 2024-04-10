import React from "react";
import Square from "@/app/components/Square";
import Grid from "../components/Grid";
import SaveBtn from "../components/SaveBtn";
import getUsersMoods from "../serverFunctions/getUsersMoods";
import normalizeDates from "@/helpers/normalizeDates";
import DateInput from "../components/DateInput";

export default async function Monthly({
  params,
}: {
  params: { emotion: Emotion };
}) {
  const data = await getDataForTopic(params.emotion);

  return (
    <section id="Monthly">
      <div className="w-fit">
        <h1 className="text-5xl font-medium text-[#FFB7B8] relative">
          Lets talk... {params.emotion}.
          <div className="w-full text-right text-xl text-[#FFB7B8] absolute -bottom-7 italic">
            How did you feel today?
          </div>
        </h1>
      </div>

      <div className="text-xl text-[#FFB7B8] w-full flex justify-end">
        <div className="max-w-20 max-w-xs italic font-medium">
          Choose an emotion option that describes your day.
        </div>
      </div>

      <div className="flex justify-between">
        <div className="relative">
          {getComponentForTopic(params.emotion, data)}
          <div className="absolute bottom-0 right-0">
            <SaveBtn topic={params.emotion} data={data} />
            <DateInput />
          </div>
        </div>
        <div>
          <div className="flex-col gap-2 flex pt-4">
            {emotionOptions[params.emotion].map(({ text, choice }, index) => (
              <div className="flex gap-2 items-center max-w-xs" key={index}>
                <Square clickable={true} choice={choice} />
                <div className="flex break-words">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const emotionOptions: EmotionOptions = {
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
};

type EmotionOptions = {
  moods: optionData[];
};

type optionData = {
  text: string;
  choice: string;
};

export type Emotion = "moods";

async function getDataForTopic(topic: Emotion) {
  if (topic === "moods") {
    const data = await getUsersMoods();
    return normalizeDates(data);
  }
}

function getComponentForTopic(topic: Emotion, data: any) {
  if (topic === "moods") {
    return <Grid data={data} />;
  }
}
