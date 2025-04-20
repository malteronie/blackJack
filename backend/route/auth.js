const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')


router.post('/register', async (req, res) => {
    try {
        const { email, nom, password } = req.body;
        const existingUser = await User.findOne({ email });
        console.log('var recu')
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur existe déjà' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            nom,
            password: hashedPassword,
            solde: 5000
          });
        console.log("pass recu")
        await newUser.save();
        console.log("user save")
        return res.status(200).json({ message: 'Inscription réussie' });
        
    } catch (error) {
        console.error("Erreur dans /register:", error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json({ solde: user.solde });
  });
module.exports = router;