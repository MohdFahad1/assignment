const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting MongoDb: ", error);
  }
};

module.exports = connectDb;
