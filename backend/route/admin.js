const express = require("express");
const router = express.Router();
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const User = require("../model/User");

router.get("/users", authenticate, isAdmin, async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });
  res.json(users);
});

router.delete("/users/:id", authenticate, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Utilisateur supprimé." });
});

module.exports = router;