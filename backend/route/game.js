const express = require("express");
const router = express.Router();
const GameHistory = require("../model/GameHistory");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/history", authMiddleware, async (req, res) => {
    const { result, playerScore, dealerScore, actions } = req.body;

    try {
        const game = new GameHistory({
            user: req.user.id, 
            result,
            playerScore,
            dealerScore,
            actions
        });
        await game.save();
        res.status(201).json({ message: "Historique enregistré." });
    } catch (err) {
        console.error("❌ Erreur enregistrement historique :", err);
        res.status(500).json({ message: "Erreur serveur" });
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