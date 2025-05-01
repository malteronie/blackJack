// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) {
//         return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
//     }

//     try {
//         const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = { id: decoded.userId, email: decoded.email }; 
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Veuillez vous reconnecter" });
//     }
// };



const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    res.status(400).json({ message: "Veuillez vous reconnecter" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Accès interdit : vous n'êtes pas administrateur." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = {
  authenticate,
  isAdmin
};