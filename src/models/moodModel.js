import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  userId: {
    type: String,
    required: [true, "Please provide a user id"],
  },
  choice: {
    type: String,
    required: [true, "Please provide a choice"],
  },
});

const Mood = mongoose.models.Mood || mongoose.model("Mood", moodSchema);

export default Mood;
