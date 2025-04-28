const express = require("express");
const router = express.Router();
const GameHistory = require("../model/GameHistory");
const authMiddleware = require("../middleware/authMiddleware");
const User = require('../model/User')

router.post("/history", authMiddleware, async (req, res) => {
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
  
      if (result === "win") {
        user.solde += mise * 2;
      } else if (result === "draw") {
        user.solde += mise;
      } else if (result === "lose") {
        user.solde -= mise
      }
  
      await user.save();
  
      res.status(201).json({ message: "Historique enregistré", solde: user.solde });
    } catch (err) {
    }
  });

  router.get("/history/:player", authMiddleware, async (req, res) => {
    try {
        const history = await GameHistory.find({ user: req.params.player }).sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});




module.exports = router;