const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../database/store.db');

class Database {
    constructor() {
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(DB_PATH, (err) => {
                if (err) {
                    console.error('Database connection error:', err);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    this.initializeTables()
                        .then(() => resolve())
                        .catch(reject);
                }
            });
        });
    }

    initializeTables() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                // Products table
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS products (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        description TEXT,
                        price REAL NOT NULL,
                        original_price REAL,
                        image_url TEXT,
                        category TEXT,
                        is_sale BOOLEAN DEFAULT 0,
                        is_new BOOLEAN DEFAULT 0,
                        stock INTEGER DEFAULT 0,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                // Orders table
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS orders (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        customer_name TEXT NOT NULL,
                        customer_email TEXT NOT NULL,
                        customer_phone TEXT,
                        shipping_address TEXT NOT NULL,
                        shipping_city TEXT NOT NULL,
                        shipping_state TEXT NOT NULL,
                        shipping_zip TEXT NOT NULL,
                        payment_method TEXT NOT NULL,
                        total_amount REAL NOT NULL,
                        status TEXT DEFAULT 'pending',
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                // Order items table
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS order_items (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        order_id INTEGER NOT NULL,
                        product_id INTEGER NOT NULL,
                        quantity INTEGER NOT NULL,
                        price REAL NOT NULL,
                        FOREIGN KEY (order_id) REFERENCES orders(id),
                        FOREIGN KEY (product_id) REFERENCES products(id)
                    )
                `);

                // Contact messages table
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS contact_messages (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL,
                        subject TEXT,
                        message TEXT NOT NULL,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.seedData().then(() => resolve()).catch(reject);
                    }
                });
            });
        });
    }

    seedData() {
        return new Promise((resolve, reject) => {
            // Check if products already exist
            this.db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (row.count === 0) {
                    const products = [
                        {
                            name: 'Wireless Headphones',
                            description: 'Premium sound quality with noise cancellation',
                            price: 2999,
                            original_price: 4999,
                            image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
                            category: 'Audio',
                            is_sale: 1,
                            stock: 50
                        },
                        {
                            name: 'Smart Watch Pro',
                            description: 'Track your fitness and stay connected',
                            price: 5999,
                            original_price: null,
                            image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
                            category: 'Wearables',
                            is_new: 0,
                            stock: 30
                        },
                        {
                            name: 'Laptop Stand',
                            description: 'Ergonomic design for better posture',
                            price: 1499,
                            original_price: null,
                            image_url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
                            category: 'Accessories',
                            is_new: 1,
                            stock: 100
                        },
                        {
                            name: 'Wireless Keyboard',
                            description: 'Mechanical keys with RGB lighting',
                            price: 3499,
                            original_price: null,
                            image_url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
                            category: 'Accessories',
                            is_new: 0,
                            stock: 75
                        },
                        {
                            name: 'Webcam HD',
                            description: 'Crystal clear video calls and streaming',
                            price: 2299,
                            original_price: null,
                            image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
                            category: 'Accessories',
                            is_new: 0,
                            stock: 60
                        },
                        {
                            name: 'USB-C Hub',
                            description: 'Multi-port adapter for connectivity',
                            price: 999,
                            original_price: 1499,
                            image_url: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=400&fit=crop',
                            category: 'Accessories',
                            is_sale: 1,
                            stock: 120
                        },
                        {
                            name: 'Wireless Mouse',
                            description: 'Precision tracking and comfort',
                            price: 899,
                            original_price: null,
                            image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
                            category: 'Accessories',
                            is_new: 0,
                            stock: 90
                        },
                        {
                            name: 'Portable SSD',
                            description: 'Fast storage with 1TB capacity',
                            price: 7999,
                            original_price: null,
                            image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
                            category: 'Storage',
                            is_new: 1,
                            stock: 40
                        }
                    ];

                    const stmt = this.db.prepare(`
                        INSERT INTO products (name, description, price, original_price, image_url, category, is_sale, is_new, stock)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `);

                    products.forEach(product => {
                        stmt.run(
                            product.name,
                            product.description,
                            product.price,
                            product.original_price,
                            product.image_url,
                            product.category,
                            product.is_sale,
                            product.is_new,
                            product.stock
                        );
                    });

                    stmt.finalize(() => {
                        console.log('Database seeded with initial products');
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connection closed');
                    resolve();
                }
            });
        });
    }
}

// Create and export singleton instance
const database = new Database();
database.connect().catch(err => {
    console.error('Failed to initialize database:', err);
});

module.exports = database;
