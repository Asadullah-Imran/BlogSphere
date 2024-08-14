import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";

// Configure dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Set up CORS options
const corsOptions = {
  origin: ["https://likhalikhi.vercel.app"], // Allow only your frontend domain
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
