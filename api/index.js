import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";

// Configure dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.get("/", (req, res) => res.send("Hello World"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
