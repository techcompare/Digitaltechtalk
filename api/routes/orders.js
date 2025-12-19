const express = require('express');
const router = express.Router();
const db = require('../database');

// POST create new order
router.post('/', async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingZip,
            paymentMethod,
            items,
            totalAmount
        } = req.body;

        // Validate required fields
        if (!customerName || !customerEmail || !shippingAddress || !shippingCity || 
            !shippingState || !shippingZip || !paymentMethod || !items || items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }

        // Create order
        const orderResult = await db.run(`
            INSERT INTO orders (customer_name, customer_email, customer_phone, 
                shipping_address, shipping_city, shipping_state, shipping_zip, 
                payment_method, total_amount)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingZip,
            paymentMethod,
            totalAmount
        ]);

        const orderId = orderResult.id;

        // Create order items
        for (const item of items) {
            await db.run(`
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)
            `, [orderId, item.productId, item.quantity, item.price]);
        }

        res.json({ 
            success: true, 
            data: { orderId },
            message: 'Order placed successfully' 
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        const items = await db.query(`
            SELECT oi.*, p.name as product_name, p.image_url
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `, [req.params.id]);

        res.json({ 
            success: true, 
            data: { ...order, items } 
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
