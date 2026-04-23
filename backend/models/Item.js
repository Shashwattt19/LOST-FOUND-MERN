const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ["Lost", "Found"],   // ✅ important for exam
    required: true
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now         // ✅ auto date
  },
  contactInfo: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Item", itemSchema);