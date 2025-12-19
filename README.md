# TDS Innovation Store

Welcome to **TDS Innovation Store** - Your trusted partner for digital technology solutions!

## 🛍️ About

TDS Innovation Store is a professional full-stack e-commerce platform offering cutting-edge technology products designed to enhance your digital lifestyle. We provide:

- **Premium Tech Products**: Headphones, smartwatches, keyboards, and more
- **Competitive Pricing**: Best prices with regular discounts
- **Fast Delivery**: Quick and reliable shipping across India
- **Secure Checkout**: Multiple payment options including COD, UPI, and card payments
- **24/7 Support**: Always here to help with your queries

## 🏗️ Architecture

This is a **full-stack application** with:

### Backend
- **Node.js & Express**: RESTful API server
- **SQLite**: Lightweight database for products, orders, and contact messages
- **API Routes**:
  - `/api/products` - Product management
  - `/api/orders` - Order processing
  - `/api/contact` - Contact form submissions

### Frontend
- **HTML5/CSS3/JavaScript**: Modern, responsive UI
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Beautiful iconography
- **Dynamic Data**: All content loaded from backend APIs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/techcompare/Digitaltechtalk.git
cd Digitaltechtalk
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

5. Open your browser and visit:
```
http://localhost:3000
```

## 🌐 Website Structure

- **index.html** - Main e-commerce homepage with featured products
- **product.html** - Complete product catalog page
- **order.html** - Checkout and order placement page
- **server.js** - Express server and API endpoints
- **api/database.js** - Database connection and operations
- **api/routes/** - API route handlers

## ✨ Features

### Full-Stack Implementation
- ✅ RESTful API backend
- ✅ SQLite database with proper schema
- ✅ Dynamic product loading from database
- ✅ Persistent cart with localStorage
- ✅ Order management system
- ✅ Contact form with backend storage
- ✅ Environment-based configuration

### User Features
- ✅ Shopping cart with add/remove functionality
- ✅ Product quantity management
- ✅ Order summary and total calculation
- ✅ Checkout form with validation
- ✅ Multiple payment options
- ✅ Responsive navigation
- ✅ Product filtering (UI)
- ✅ Newsletter subscription (UI)

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)

## 🎨 Design & Technology

- **Framework**: Tailwind CSS for responsive design
- **Icons**: Lucide Icons for modern UI elements
- **Typography**: Inter font family
- **Color Scheme**: Purple and gray palette
- **Mobile-First**: Fully responsive across all devices
- **Backend**: Node.js with Express
- **Database**: SQLite with proper schema design

## 🔧 Development

### Project Structure
```
.
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment configuration template
├── api/
│   ├── database.js       # Database connection and queries
│   └── routes/
│       ├── products.js   # Product API routes
│       ├── orders.js     # Order API routes
│       └── contact.js    # Contact API routes
├── database/             # SQLite database files
├── index.html           # Homepage
├── product.html         # Products page
└── order.html           # Checkout page
```

### Database Schema

**Products Table**
- id, name, description, price, original_price, image_url, category, is_sale, is_new, stock

**Orders Table**
- id, customer info, shipping details, payment_method, total_amount, status

**Order Items Table**
- id, order_id, product_id, quantity, price

**Contact Messages Table**
- id, name, email, subject, message

## 🔮 Future Enhancements

- User authentication and account management
- Admin dashboard for product/order management
- Advanced search and filtering
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Payment gateway integration
- Order tracking system
- Analytics and reporting

## 📄 License

© 2025 TDS Innovation Store. All rights reserved.

---

**Domain**: tdsinnovation.store  
**Type**: Full-Stack E-commerce Platform  
**Focus**: Technology Products  
**Stack**: Node.js, Express, SQLite, HTML/CSS/JS
