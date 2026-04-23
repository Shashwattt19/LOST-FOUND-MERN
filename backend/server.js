const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (IMPORTANT FOR VERCEL FRONTEND)
app.use(cors({
  origin: "*",   // for now allow all (safe for your project)
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/items"));

// ✅ Test route (VERY USEFUL)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Use Render PORT (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});