const MoodLog = require("../models/moodlog");
const FoodItem = require("../models/foodItem");

const detectMoodFromText = require("../utils/detectMood");
const detectMoodUsingAI = require("../utils/aiMoodDetector.mock");

const getTimeOfDay = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 21) return "evening";
  return "night";
};

const fetchWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  const data = await res.json();

  const code = data.current_weather.weathercode;

  if (code < 3) return "sunny";
  if (code < 50) return "cloudy";
  if (code < 70) return "rainy";
  return "cold";
};

exports.createMoodLog = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { mood, userNote, cravingType, actionType, latitude, longitude } =
      req.body;
    // const { latitude, longitude} = req.body;
    console.log(req.body);
    console.log(latitude, longitude, "location");

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

    const timeOfDay = getTimeOfDay();
    let weather = "unknown"; // can improve later
    if (latitude && longitude) {
      weather = await fetchWeather(latitude, longitude);
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
