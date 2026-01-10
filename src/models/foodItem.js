const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["snack", "meal", "drink"],
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },

    tags: [String],

    suitableMoods: [String],

    calories: Number,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

foodItemSchema.index({ category: 1 });
foodItemSchema.index({ tags: 1 });

module.exports = mongoose.model("FoodItem", foodItemSchema);
