const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Accès refusé');
    }

    const verified = verifyToken(token);
    if (!verified) {
        return res.status(400).send('Token invalide');
    }

    req.user = verified;
    next();
};

module.exports = authMiddleware;
