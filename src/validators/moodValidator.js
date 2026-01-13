const Joi = require("joi");

exports.createMoodSchema = Joi.object({
  mood: Joi.string()
    .valid("happy", "stressed", "bored", "tired", "sad", "calm")
    .allow(""),

  userNote: Joi.string().min(5).max(500).allow(""),

  cravingType: Joi.string()
    .valid("sweet", "spicy", "light", "heavy", "healthy")
    .allow(""),

  actionType: Joi.string().valid("ate", "craving").required(),

  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
}).or("mood", "userNote");
