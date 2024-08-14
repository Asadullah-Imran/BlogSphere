import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Configure dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.use("/api/posts", (req, res) => {
  res.send("Posts route");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
