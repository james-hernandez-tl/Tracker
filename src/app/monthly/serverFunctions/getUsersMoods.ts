import Mood from "@/models/moodModel";
import { connect } from "@/dbConfig/dbConfig";
import me from "@/helpers/me";
import getStartAndEndDate from "@/helpers/getStartAndEndDate";

connect();

export default async function getUsersMoods() {
  const userId = await me();
  let [startDate, endDate] = getStartAndEndDate();

  const allMoods = await Mood.find({
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
