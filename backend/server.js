const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/items"));

// Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});