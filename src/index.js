const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.error("error in db connection", err.message);
  });

const PORT = process.env.port || 3003;

app.listen(PORT, "0.0.0.0", () => {
  console.log("server is running on port 3003");
});
