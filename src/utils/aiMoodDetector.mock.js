/**
 * Mock AI Mood Detector
 * This simulates how a real AI would behave
 * WITHOUT calling any external service
 */

const detectMoodUsingAI = async (text) => {
  if (!text) return null;

  const lowerText = text.toLowerCase();

  // Simulate AI "thinking time"
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Pretend AI logic (slightly smarter than rule-based)
  if (lowerText.includes("boss") || lowerText.includes("work pressure")) {
    return {
      mood: "stressed",
      confidence: 0.85,
    };
  }

  if (lowerText.includes("exhausted") || lowerText.includes("burned out")) {
    return {
      mood: "tired",
      confidence: 0.8,
    };
  }

  if (lowerText.includes("very happy") || lowerText.includes("great day")) {
    return {
      mood: "happy",
      confidence: 0.9,
    };
  }

  // AI couldn't decide
  return null;
};

module.exports = detectMoodUsingAI;
