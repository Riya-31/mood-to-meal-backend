const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
        description: String,

    price: {
      type: Number,
      required: true,
    },
     image: {
      type: String, // URL (Cloudinary / S3)
      required: true,
    },

    category: {
      type: String,
      enum: ["snack", "meal", "drink","dessert"],
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },

     suitableMoods: [
      {
        type: String,
        enum: ["happy", "stressed", "bored", "tired", "sad", "calm"],
      },
    ],

    tags: [String], // "sweet", "healthy", "comfort"

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
