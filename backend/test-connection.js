import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

async function connectToMongoDB() {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
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
