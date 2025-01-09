const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("success connected to mongodb");
  } catch (error) {
    console.error("Failed to connect to mongodb", error);
    process.exit(1);
  }
};

module.exports = connectDB;
