const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const router = express.Router()
const { authenticate } = require('../middleware/authMiddleware');


router.post('/register', async (req, res) => {
    try {
        const { email, nom, password } = req.body;

        // Validation du mot de passe fort
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial (@$!%*#?&)"
            });
        }

        const existingUser = await User.findOne({ email });
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

        await newUser.save();
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

        // ✅ On inclut maintenant aussi le rôle dans le token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role // <-- important pour le middleware isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1y' // <-- token expire dans 1 an
            }
        );

        res.status(200).json({
            token,
            userId: user._id,
            role: user.role // <-- utile côté frontend aussi
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/me', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json({ solde: user.solde });
  });
module.exports = router;