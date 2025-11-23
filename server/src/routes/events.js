const express = require('express');
const db = require('../db');
const router = express.Router();

// Middleware to verify token (simplified)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });
    // In a real app, verify JWT here. For MVP speed, we assume the gateway/auth middleware handles this or we add it.
    // Adding basic verification:
    const jwt = require('jsonwebtoken');
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secret');
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// GET /eventos (Public)
router.get('/', (req, res) => {
    const stmt = db.prepare('SELECT * FROM events');
    const events = stmt.all();
    res.json(events);
});

// POST /eventos (Admin only - simulated)
router.post('/', verifyToken, (req, res) => {
    const { title, description, date, location, image_url } = req.body;
    const stmt = db.prepare('INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(title, description, date, location, image_url);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
});

// PUT /eventos/:id (Admin only - simulated)
router.put('/:id', verifyToken, (req, res) => {
    const { title, description, date, location, image_url } = req.body;
    const { id } = req.params;
    const stmt = db.prepare('UPDATE events SET title = ?, description = ?, date = ?, location = ?, image_url = ? WHERE id = ?');
    const info = stmt.run(title, description, date, location, image_url, id);
    if (info.changes === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event updated successfully' });
});

// DELETE /eventos/:id (Admin only - simulated)
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM events WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
});

// POST /eventos/:id/inscrever (User)
router.post('/:id/inscrever', verifyToken, (req, res) => {
    const eventId = req.params.id;
    const userId = req.userId;

    try {
        const stmt = db.prepare('INSERT INTO registrations (user_id, event_id) VALUES (?, ?)');
        stmt.run(userId, eventId);
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).json({ error: 'Already subscribed' });
        }
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
