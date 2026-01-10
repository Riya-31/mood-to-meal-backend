const mongoose = require("mongoose");

const moodLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ["happy", "stressed", "bored", "tired", "low", "sad"],
    },

    cravingType: {
      type: String,
      enum: ["sweet", "spicy", "light", "heavy", "healthy"],
    },

    timeOfDay: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night"],
    },

    weather: String,

    actionType: {
      type: String,
      enum: ["ate", "craving"],
      required: true,
    },

    foodItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },

    userNote: String,

    aiDetectedMood: String,
    aiConfidence: Number,
  },
  { timestamps: true }
);

moodLogSchema.index({userId:1,createdAt:-1});

module.exports = mongoose.model("MoodLog", moodLogSchema);
