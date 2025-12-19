const express = require('express');
const router = express.Router();
const db = require('../database');

// POST contact form submission
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name, email, and message are required' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email format' 
            });
        }

        // Save contact message
        const result = await db.run(`
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES (?, ?, ?, ?)
        `, [name, email, subject || '', message]);

        res.json({ 
            success: true,
            data: { messageId: result.id },
            message: 'Thank you for contacting us! We will get back to you soon.' 
        });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET all contact messages (admin endpoint)
router.get('/', async (req, res) => {
    try {
        const messages = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
        res.json({ success: true, data: messages });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
