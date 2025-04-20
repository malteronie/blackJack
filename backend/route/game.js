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
  
      // 🔥 C’est ici que tu modifies le solde :
      if (result === "win") {
        user.solde += mise * 2;
      } else if (result === "draw") {
        user.solde += mise;
      } else if (result === "lose") {
        user.solde -= mise
      }
      // Si "lose", la mise est déjà retirée côté frontend
  
      await user.save(); // 💾 Et là que c’est enregistré dans MongoDB
  
      res.status(201).json({ message: "Historique enregistré", solde: user.solde });
    } catch (err) {
    }
  });

router.get("/history/:player", async (req, res) => {
    try {
        const history = await GameHistory.find({ user: req.params.player }).sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});




module.exports = router;