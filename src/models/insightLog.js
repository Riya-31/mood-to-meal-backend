const mongoose = require("mongoose");

const insightLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    insightType: {
      type: String,
      enum: ["habit", "risk", "suggestion"],
    },

    insightText: {
      type: String,
      required: true,
    },

    confidenceScore: Number,

    generatedFrom: {
      startDate: Date,
      endDate: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InsightLog", insightLogSchema);
