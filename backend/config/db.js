const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Trying to connect to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast instead of hanging
      connectTimeoutMS: 5000,
    });

    console.log("MongoDB Connected 🚀");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;