import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "love", "wow", "sad", "angry"],
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
