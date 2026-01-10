const express = require("express");
const router = express.Router();
const { createMoodLog } = require("../controllers/moodController");
const { validate } = require("../middlewares/validate");
const { createMoodSchema } = require("../validators/moodValidator");
const auth = require("../middlewares/auth.middleware");

router.post("/create-mood-log", auth, validate(createMoodSchema), createMoodLog);

module.exports = router;
