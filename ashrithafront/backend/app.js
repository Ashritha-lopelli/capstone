const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const userRoutes = require("./src/routes/userRoutes");
const packageRoutes = require("./src/routes/packageRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

const app = express();
const port = 4545;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "travel-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

app.use("/", userRoutes);
app.use("/", packageRoutes);
app.use("/", reviewRoutes);

const { DATABASE, DATABASE_URL } = process.env;

if (!DATABASE || !DATABASE_URL) {
  throw new Error(
    "Env vars not found. `cp .env.sample .env` and fill env values in .env"
  );
}

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
