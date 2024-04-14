import Mood from "@/models/moodModel";
import Health from "@/models/healthModel";
import { connect } from "@/dbConfig/dbConfig";
import me from "@/helpers/me";
import getStartAndEndDate from "@/helpers/getStartAndEndDate";
import { Topic } from "../[topic]/page";

connect();

export default async function getUsersMoods(topic: Topic) {
  const userId = await me();
  let [startDate, endDate] = getStartAndEndDate();

  const Model = getTopicModel(topic);
  const allMoods = await Model.find({
    createdAt: { $gte: startDate, $lt: endDate },
    userId,
  });

  return allMoods.map((mood) => ({
    _id: mood._id.toJSON(),
    userId: mood.userId,
    createdAt: mood.createdAt,
    choice: mood.choice,
  }));
}

function getTopicModel(topic: Topic) {
  switch (topic) {
    case "moods":
      return Mood;
    case "health":
      return Health;
  }
}
