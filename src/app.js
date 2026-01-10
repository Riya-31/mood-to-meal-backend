const express = require("express");
const cors = require("cors");

const authRoutes= require("./auth/auth.routes")

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth",authRoutes)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Abhi ham jinda hai" });
});

module.exports = app;
