const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const paymentRoute = require("./routes/paymentRoute");
const chatRoute = require("./routes/chatRoute");
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

// INITILIAZING RAZORPAY //

app.use("/api/v1", questionRoute);
app.use("/api/v1", answerRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", chatRoute);

app.use("/api/v1", userRoute);
app.get("/api/v1/getKey", (req, res) => {
  res.status(200).json({ success: true, key: process.env.RAZORPAY_API_KEY });
});
// ------------------------------

// ------------------------------
module.exports = app;
// ------------------------------
