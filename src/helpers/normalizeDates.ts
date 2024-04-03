export default function (emotions: emotion[]) {
  const emotionObject: any = {};

  for (let emotion of emotions) {
    const currentDate = new Date(emotion.createdAt);
    const dateString = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDay()}`;

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
