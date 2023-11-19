const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../utils/db');
const { generateToken } = require('../utils/jwtUtils');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userExist = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExist.rows.length > 0) {
            return res.status(400).send('L’utilisateur existe déjà');
        }

        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        const token = generateToken({ username: user.username });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).send('Erreur du serveur');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(403).send('Identifiants invalides');
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).send('Identifiants invalides');
        }

        const token = generateToken({ username: user.username });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Erreur du serveur');
    }
});

module.exports = router;
