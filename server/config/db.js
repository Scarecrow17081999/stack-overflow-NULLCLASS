const mongoose = require("mongoose");
// const db = "mongodb://127.0.0.1:27017/STACK_OVERFLOW";
const db = process.env.MONGO_URI;

const databaseConnection = async () => {
  try {
    const { connection } = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database connection successful to host ${connection.host}`);
  } catch (error) {
    console.log("database connection failed", error);
  }
};

module.exports = databaseConnection;
