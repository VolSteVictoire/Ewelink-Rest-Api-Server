const express = require('express');
const ewelink = require('ewelink-api');

const app = express();
const port = process.env.PORT || 10000;

// Pour lire les données JSON dans les requêtes POST
app.use(express.json());

// Configuration eWeLink (via variables d'environnement)
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const region = process.env.REGION || 'eu';
//const deviceId = process.env.DEVICE_ID;

let connection;

// Connexion eWeLink à l'ouverture du serveur
(async () => {
  try {
    connection = new ewelink({
      email,
      password,
      region,
    });

    const auth = await connection.getCredentials();
    console.log('Connecté à eWeLink ✔️');
  } catch (err) {
    console.error('Erreur de connexion à eWeLink ❌:', err.message);
  }
})();

// Exemple d’API pour allumer un appareil
app.get('/on', async (req, res) => {
  try {
    const response = await connection.setDevicePowerState(deviceId, 'on');
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exemple d’API pour éteindre un appareil
app.get('/off', async (req, res) => {
  try {
    const response = await connection.setDevicePowerState(deviceId, 'off');
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vérification de l’état
app.get('/status', async (req, res) => {
  try {
    const response = await connection.getDevicePowerState(deviceId);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serveur en écoute
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
