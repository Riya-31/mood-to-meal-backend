const MoodLog = require("../models/moodlog");
const FoodItem = require("../models/foodItem");

const detectMoodFromText = require("../utils/detectMood");
const detectMoodUsingAI =require("../utils/aiMoodDetector.mock")

exports.createMoodLog = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { mood, userNote, cravingType, timeOfDay, actionType, weather } =
      req.body;

    let finalMood;
    let moodSource; 
    let confidence;

    if (mood) {
      ((finalMood = mood), (moodSource = "user"), (confidence = 1));
    } else if (userNote) {
      const aiResult = await detectMoodUsingAI(userNote);

  if (aiResult) {
    finalMood = aiResult.mood;
    confidence = aiResult.confidence;
    moodSource = "ai";
  } else {
    finalMood = detectMoodFromText(userNote);
    confidence = 0.7;
    moodSource = "rule";
  }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please Select mood or describe how you feel",
      });
    }

    const moodlog = await MoodLog.create({
      userId,
      mood: finalMood,
      moodSource,
      confidence,
      userNote,
      cravingType,
      timeOfDay,
      weather,
      actionType,
    });

    const recommendations = await FoodItem.find({
      suitableMoods: finalMood,
      isActive: true,
    })
      .limit(5)
      .select("name category calories tags");

    return res.status(200).json({
      success: true,
      message: "Mood Logged Successfully",
      mood: finalMood,
      recommendations,
    });
  } catch (error) {
    console.error("Mood Log Error", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging mood",
    });
  }
};
