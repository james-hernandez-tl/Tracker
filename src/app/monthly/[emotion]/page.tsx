import React from "react";
import Square from "@/app/components/Square";
import Grid from "../components/Grid";
import SaveBtn from "../components/SaveBtn";
import getUsersMoods from "../serverFunctions/getUsersMoods";
import normalizeDates from "@/helpers/normalizeDates";

export default async function Monthly({
  params,
}: {
  params: { emotion: Emotion };
}) {
  const data = await getDataForTopic(params.emotion);

  return (
    <section id="Monthly">
      <div className="w-fit">
        <h1 className="text-5xl font-semibold">
          Lets talk... {params.emotion}.
        </h1>
        <div className="w-full text-right text-xl">How did you feel today?</div>
      </div>

      <div className="flex justify-between">
        {getComponentForTopic(params.emotion, data)}
        <div>
          <div className="text-xl">
            <div>Choose an emotion option</div>
            <div>that describes your day.</div>
          </div>
          <div className="flex-col gap-2 flex pt-4">
            {emotionOptions[params.emotion].map(({ text, choice }, index) => (
              <div className="flex gap-2 content-end" key={index}>
                <Square clickable={true} choice={choice} />
                <div className="h-min">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBtn topic={params.emotion} data={data} />
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
