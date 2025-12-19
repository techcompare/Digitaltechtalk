const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all products
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (search) {
            query += ' AND (name LIKE ? OR description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';

        const products = await db.query(query, params);
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
        
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET featured products
router.get('/featured/list', async (req, res) => {
    try {
        const products = await db.query('SELECT * FROM products WHERE is_new = 1 OR is_sale = 1 LIMIT 8');
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
