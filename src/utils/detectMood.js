const detectMoodFromText = (text) => {
  if (!text) return "calm";

  const lowerText = text.toLowerCase();

  // HAPPY
  if (
    lowerText.includes("happy") ||
    lowerText.includes("excited") ||
    lowerText.includes("joy") ||
    lowerText.includes("great")
  ) {
    return "happy";
  }

  // STRESSED
  if (
    lowerText.includes("stress") ||
    lowerText.includes("pressure") ||
    lowerText.includes("scold") ||
    lowerText.includes("overwhelmed") ||
    lowerText.includes("anxious") ||
    lowerText.includes("angry")
  ) {
    return "stressed";
  }

  // TIRED
  if (
    lowerText.includes("tired") ||
    lowerText.includes("exhausted") ||
    lowerText.includes("fatigue") ||
    lowerText.includes("drained")
  ) {
    return "tired";
  }

  // SAD
  if (
    lowerText.includes("sad") ||
    lowerText.includes("low") ||
    lowerText.includes("down") ||
    lowerText.includes("depressed")
  ) {
    return "sad";
  }

  // BORED
  if (
    lowerText.includes("bored") ||
    lowerText.includes("alone") ||
    lowerText.includes("nothing to do") ||
    lowerText.includes("fed up")
  ) {
    return "bored";
  }

  // DEFAULT FALLBACK
  return "calm";
};

module.exports = detectMoodFromText;
