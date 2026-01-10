const mongoose = require("mongoose");

const recommendationLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    moodLogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MoodLog",
    },

    recommendedFoods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
      },
    ],

    aiPromptVersion: String,
    aiResponseSummary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RecommendationLog",
  recommendationLogSchema
);
