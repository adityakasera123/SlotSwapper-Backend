import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import swapRoutes from "./src/routes/swapRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Default test route
app.get("/", (req, res) => {
  res.send("SlotSwapper Backend Running 🚀");
});

// ✅ Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", swapRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
