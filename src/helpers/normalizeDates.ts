export default function normalizeDates(emotions: emotion[]) {
  const emotionObject: any = {};

  for (let emotion of emotions) {
    const currentDate = new Date(emotion.createdAt);
    const dateString = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    emotionObject[dateString] = emotion;
  }
  return emotionObject;
}

type emotion = {
  _id: string;
  createdAt: Date;
  userId: string;
  choice: string;
};
