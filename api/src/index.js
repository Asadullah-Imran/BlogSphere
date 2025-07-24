// src/index.js
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";
console.log("index.js");
dotenv.config(); // Always first

console.log("index.js");

const PORT = process.env.PORT || 8001;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error in index.js:", err));
