const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===== Middlewares =====
app.use(express.json());
app.use(cors({ origin: "*" }));

// ===== MongoDB Connect =====
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully 🎉"))
  .catch(err => console.log("Mongo Error ❌", err.message));

// ===== Routes =====
const userRoutes = require("./routes/userRoutes");
const weeklyRoutes = require("./routes/weeklyRoutes");
const progressRoutes = require("./routes/progressRoutes");
const financeRoutes = require("./routes/financeRoutes");

// 🔥 FIX HERE
app.use("/api/users", userRoutes);

app.use("/api/weekly", weeklyRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/finance", financeRoutes);
+ app.use("/api/users", userRoutes);
// ===== Default Route =====
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// ===== Server Start =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
