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
      user.solde -= mise;

      if (result === "win") {
        user.solde += mise * 2; // gain net = +10 (si mise = 10)
      } else if (result === "draw") {
        user.solde += mise;     // on rend la mise seulement
      }
  
      await user.save();
  
      res.status(201).json({ message: "Historique enregistré", solde: user.solde });
    } catch (err) {
    }
  });

  router.get("/history/:player", authMiddleware, async (req, res) => {
    console.log("Received request for game history for user:", req.params.player); // Log pour vérifier l'appel
    try {
        const history = await GameHistory.find({ user: req.params.player }).sort({ date: -1 });
        console.log("History retrieved:", history); // Log pour vérifier l'historique récupéré
        res.json(history);
    } catch (err) {
        console.error("Error retrieving history:", err); // Log d'erreur
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});





module.exports = router;