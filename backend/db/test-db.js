const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    console.log("Attempting to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connection successful!");
    console.log("Connected to host:", mongoose.connection.host);
    console.log("Database name:", mongoose.connection.name);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("\nAvailable collections:");

    if (collections.length === 0) {
      console.log("No collections found. Your database is empty.");
    } else {
      collections.forEach((collection) => {
        console.log(`- ${collection.name}`);
      });
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\nConnection closed");
  }
}

testConnection();
