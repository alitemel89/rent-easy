// src/config/database.ts
require('dotenv').config(); // Load environment variables from .env file
import mongoose from "mongoose"; // Import ConnectionOptions type

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
