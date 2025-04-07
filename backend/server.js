const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./route/auth')
require('dotenv').config();

const app = express();
const port = process.env.PORT|| 5000;
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use("/api/auth", authRoute)

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('err'));



app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

//class-validator 
//class-transformer
//reflect-metadata

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
 