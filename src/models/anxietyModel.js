import mongoose from "mongoose";

const anxietySchema = mongoose.Schema({
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

const Anxiety =
  mongoose.models.Anxiety || mongoose.model("Anxiety", anxietySchema);

export default Anxiety;
