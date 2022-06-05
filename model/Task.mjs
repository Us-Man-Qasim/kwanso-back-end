import mongoose from "mongoose";

const { Schema } = mongoose;
const taskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

export default Task;
