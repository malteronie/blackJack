const express = require("express");
const router = express.Router();
const GameHistory = require("../model/GameHistory");
const { authenticate } = require("../middleware/authMiddleware");
const User = require('../model/User');

router.post("/history", authenticate, async (req, res) => {
  const { result, playerScore, dealerScore, actions, mise } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const game = new GameHistory({
      user: user._id,
      result,
      playerScore,
      dealerScore,
      actions
    });

    await game.save();
    user.solde -= mise;

    if (result === "win") {
      user.solde += mise * 2;
    } else if (result === "draw") {
      user.solde += mise;
    }

    await user.save();

    res.status(201).json({ message: "Historique enregistré", solde: user.solde });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de l'historique :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

router.get("/history/:player", authenticate, async (req, res) => {
  console.log("Received request for game history for user:", req.params.player); 
  try {
    const history = await GameHistory.find({ user: req.params.player }).sort({ date: -1 });
    console.log("History retrieved:", history);
    res.json(history);
  } catch (err) {
    console.error("Error retrieving history:", err); 
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;