const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secret');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// GET /utilizador/inscricoes
router.get('/utilizador/inscricoes', verifyToken, (req, res) => {
    const stmt = db.prepare(`
    SELECT r.id as registration_id, e.* 
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE r.user_id = ?
  `);
    const events = stmt.all(req.userId);
    res.json(events);
});

// DELETE /inscricoes/:id
router.delete('/inscricoes/:id', verifyToken, (req, res) => {
    const registrationId = req.params.id;
    // Ensure the registration belongs to the user
    const checkStmt = db.prepare('SELECT user_id FROM registrations WHERE id = ?');
    const reg = checkStmt.get(registrationId);

    if (!reg) return res.status(404).json({ error: 'Registration not found' });
    if (reg.user_id !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const stmt = db.prepare('DELETE FROM registrations WHERE id = ?');
    stmt.run(registrationId);
    res.json({ message: 'Registration cancelled' });
});

module.exports = router;
