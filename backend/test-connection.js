require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

async function connectToMongoDB() {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB Atlas!");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("Available collections:");
    if (collections.length === 0) {
      console.log("No collections found. Your database is empty.");
    } else {
      collections.forEach((collection) => {
        console.log(`- ${collection.name}`);
      });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

connectToMongoDB();
