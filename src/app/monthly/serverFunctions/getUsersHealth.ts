import Health from "@/models/healthModel";
import { connect } from "@/dbConfig/dbConfig";
import me from "@/helpers/me";
import getStartAndEndDate from "@/helpers/getStartandEndDate";

connect();

export default async function getUsersHealth() {
  const userId = await me();
  let [startDate, endDate] = getStartAndEndDate();

  const allHealth = await Health.find({
    userId: userId,
    createdAt: { $gte: startDate, $lt: endDate },
  });

  return allHealth.map((mood) => ({
    _id: mood._id.toJSON(),
    userId: mood.userId,
    createdAt: mood.createdAt,
    choice: mood.choice,
  }));
}
