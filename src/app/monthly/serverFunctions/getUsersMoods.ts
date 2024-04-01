import Mood from "@/models/moodModel";
import { connect } from "@/dbConfig/dbConfig";
import me from "@/helpers/me";

connect();

export default async function getUsersMoods() {
  const userId = await me();
  const currentDate = new Date();

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const allMoods = await Mood.find({
    createdAt: { $gte: startDate, $lt: endDate },
    userId,
  });

  return allMoods;
}
