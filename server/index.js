const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const gameLogic = require('./gameLogic');

const app = express();
app.use(cors({
  origin: 'http://localhost:19006'
}));
app.use(bodyParser.json());

const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const wss = new WebSocket.Server({ server });

app.use(authRoutes);

gameLogic(wss);

module.exports = { app, server, wss };
