const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please use a different port.`
    );
    process.exit(1);
  } else {
    console.error("Server error:", error);
  }
});
