import Mood from "@/models/moodModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import removeTimeFromDate from "@/helpers/removeTimeFromDate";

export default async function createUserMood(choice: string, date: Date) {
  try {
    const userId = await getDataFromToken();
    if (!userId) return undefined;
    removeTimeFromDate(date);

    const mood = await Mood.findOne({ userId, createdAt: date });

    if (mood) return undefined;

    const newMood = new Mood({
      createdAt: date,
      userId,
      choice,
    });

    const savedMood = await newMood.save();

    return savedMood;
  } catch (error: any) {
    return undefined;
  }
}
