const app = require("./app");
const dotenv = require("dotenv");
const cors = require("cors");
// const cloudinary = require("cloudinary");
// CONFIGURING ENVIRONMENT //
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}
// CONFIGURING CLOUDINARY //
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// CONNECTING DATABASE //
const database = require("./config/db");
database();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
