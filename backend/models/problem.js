const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    leetcodeNumber: {
      type: Number,
      default: null,
    },

    problemUrl: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Solved", "Attempted", "Not Started"],
      default: "Not Started",
    },

    timeComplexity: {
      type: String,
      default: "",
    },

    spaceComplexity: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    platform: {
      type: String,
      default: "LeetCode",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Problem", problemSchema);