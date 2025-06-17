const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Food-Delivery-App:Food-Delivery-App123@cluster0.4nd9wjq.mongodb.net/Food-Delivery-App');
    console.log("DB CONNECTED");
  } catch (err) {
    console.error("DB CONNECTION FAILED:", err.message);
    process.exit(1);  // Exit process if DB connection fails
  }
};

module.exports = { connectDB };
