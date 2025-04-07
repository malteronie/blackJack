const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = { id: decoded.userId, email: decoded.email };  // Ajout de l'email
        next();
    } catch (error) {
        res.status(400).json({ message: "Token invalide." });
    }
};