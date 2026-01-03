const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Abhi ham jinda hai" });
});

module.exports = app;
