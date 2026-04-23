const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

router.post("/items", auth, async (req, res) => {
  const item = new Item({ ...req.body, userId: req.user.id });
  await item.save();
  res.json(item);
});

router.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.get("/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

router.put("/items/:id", auth, async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json(updated);
});

router.delete("/items/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

router.get("/items/search", async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" }
  });
  res.json(items);
});

module.exports = router;