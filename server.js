const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 5000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

// Modèle utilisateur
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.JWT_SECRET;

// Inscription
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ id: newUser._id, username, email });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
});

// Connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Accès refusé' });

  try {
    const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token invalide' });
  }
};

// Route protégée
app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Profil sécurisé', user: req.user });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});



//Fonction Drag and drop image :
 
// - Créer un champ (importer une image) dans le front page utilisateur

// - Lorsqu'un utilisateur dépose une image, on récupère l'URL de l'image

// - Création d'un autre colonne "avatarUrl" dans la table "utilisateur"

// - Créer une route qui modifie l'image de l'utilisateur

// 	- Récupérer l'ID de l'utilisateur

// - Récupérer l'URL et ajoute à notre ligne qui correspond à l'utilisateur
 
// Fonction Drag and drop image :
 
// - Créer un champ (importer une image) dans le front page utilisateur (front)

// - Lorsqu'un utilisateur dépose une image, on récupère l'URL de l'image (front)

// - Création d'un autre colonne "avatarUrl" dans la table "utilisateur" (base de donnée)

// - Créer une route qui modifie l'image de l'utilisateur (backend)

// 	- Récupérer l'ID de l'utilisateur (backend)

// - Récupérer l'URL et ajoute à notre ligne qui correspond à l'utilisateur (backend et base de donnée)
 