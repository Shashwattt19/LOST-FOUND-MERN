const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json("User Registered");
  } catch {
    res.status(400).json("Email already exists");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("Invalid Email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Invalid Password");

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
});

module.exports = router;