import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    const baseUri = process.env.MONGODB_URI.replace(/\/[^/]*$/, "");
    const conn = await mongoose.connect(baseUri, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
