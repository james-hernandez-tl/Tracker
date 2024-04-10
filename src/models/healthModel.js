import mongoose from "mongoose";

const healthSchema = mongoose.Schema({
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

const health = mongoose.models.Health || mongoose.model("Health", healthSchema);

export default health;
