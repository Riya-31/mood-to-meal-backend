const Joi = require("joi");

exports.createMoodSchema = Joi.object({
  selectedMood: Joi.string().valid(
    "happy",
    "stressed",
    "bored",
    "tired",
    "sad",
    "calm"
  ),

  userNote: Joi.string().min(5).max(500),

  cravingType: Joi.string().valid(
    "sweet",
    "spicy",
    "light",
    "heavy",
    "healthy"
  ),

  timeOfDay: Joi.string().valid(
    "morning",
    "afternoon",
    "evening",
    "night"
  ),

  weather: Joi.string().max(50),

  actionType: Joi.string()
    .valid("ate", "craving")
    .required(),
})
  // 👇 CUSTOM RULE (MOST IMPORTANT)
  .or("mood", "userNote");
