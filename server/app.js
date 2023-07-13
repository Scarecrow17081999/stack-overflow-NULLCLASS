const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
// const commentRoute = require("./routes/commentRoute");
const userRoute = require("./routes/userRoute");
const bodyParser = require("body-parser");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// ------------------------------

// ------------------------------
/// USING MIDDLEWARES ///
// ------------------------------
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
// ------------------------------
/// USING ROUTES ///
// ------------------------------
app.use("/api/v1", questionRoute);
app.use("/api/v1", answerRoute);
// app.use("/api/v1", commentRoute);
app.use("/api/v1", userRoute);
// ------------------------------

// ------------------------------
module.exports = app;
// ------------------------------
