# Quick Reference Guide

## 🚀 Quick Commands

### Starting the Application

```bash
# Quick start (Windows)
start.bat

# Or manually
npm run dev

# Or separately
cd server && npm run dev
cd client && npm run dev
```

### Installing Dependencies

```bash
# Install all at once
npm run install-all

# Or individually
npm install                    # Root
cd server && npm install       # Server
cd client && npm install       # Client
```

### Building for Production

```bash
cd client
npm run build
# Output will be in client/dist
```

---

## 🔧 Environment Variables

### Server (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=sk_test_...
NODE_ENV=development
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 📝 Common Tasks

### Adding a New Page

1. Create component in `client/src/pages/NewPage.jsx`
2. Create styles in `client/src/pages/NewPage.css`
3. Add route in `client/src/App.jsx`:

```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New API Endpoint

1. Create route in `server/routes/newRoute.js`
2. Add to `server/index.js`:

```javascript
const newRoute = require("./routes/newRoute");
app.use("/api/new", newRoute);
```

### Protecting a Route

```javascript
// In server routes
const authMiddleware = require("../middleware/auth");
router.get("/protected", authMiddleware, (req, res) => {
  // req.user is available here
});
```

---

## 🎨 Styling Guide

### Using Design Tokens

```css
/* Colors */
var(--color-primary)
var(--color-secondary)
var(--color-bg-primary)
var(--color-text-primary)

/* Spacing */
var(--spacing-sm)
var(--spacing-md)
var(--spacing-lg)

/* Border Radius */
var(--radius-sm)
var(--radius-md)
var(--radius-lg)

/* Shadows */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
```

### Common Classes

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>

<!-- Cards -->
<div class="card">Content</div>
<div class="card card-glass">Glass effect</div>

<!-- Grid -->
<div class="grid grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flex -->
<div class="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

---

## 🔐 Authentication Flow

### Register

```javascript
const { register } = useAuth();
const result = await register(name, email, password);
if (result.success) {
  // User is logged in, token is stored
}
```

### Login

```javascript
const { login } = useAuth();
const result = await login(email, password);
if (result.success) {
  // User is logged in
}
```

### Logout

```javascript
const { logout } = useAuth();
logout(); // Clears token and user state
```

### Check Auth Status

```javascript
const { isAuthenticated, user } = useAuth();
if (isAuthenticated) {
  console.log("Logged in as:", user.name);
}
```

---

## 🛒 Cart Operations

### Add to Cart

```javascript
const { addToCart } = useCart();
await addToCart(product, quantity);
```

### Update Quantity

```javascript
const { updateCartItem } = useCart();
await updateCartItem(productId, newQuantity);
```

### Remove Item

```javascript
const { removeFromCart } = useCart();
await removeFromCart(productId);
```

### Clear Cart

```javascript
const { clearCart } = useCart();
await clearCart();
```

### Get Cart Info

```javascript
const { cart, getCartCount } = useCart();
console.log("Total items:", getCartCount());
console.log("Total amount:", cart.totalAmount);
```

---

## 🧪 Testing with Stripe

### Test Card Numbers

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# Check connection string in server/.env
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### CORS Error

- Ensure server is running on port 5000
- Check `vite.config.js` proxy settings
- Verify `cors()` middleware in `server/index.js`

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Useful NPM Scripts

### Root

```bash
npm run dev          # Run both client and server
npm run install-all  # Install all dependencies
```

### Server

```bash
npm run dev    # Start with nodemon
npm start      # Start without nodemon
```

### Client

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔍 API Testing

### Using curl

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Products
curl http://localhost:5000/api/products

# Get Cart (with auth)
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 MongoDB Queries

### View Collections

```javascript
// In MongoDB Compass or shell
use ecommerce
show collections
```

### Find Users

```javascript
db.users.find().pretty();
```

### Find Carts

```javascript
db.carts.find().pretty();
```

### Find Orders

```javascript
db.orders.find().pretty();
```

### Clear Data

```javascript
db.users.deleteMany({});
db.carts.deleteMany({});
db.orders.deleteMany({});
```

---

## 🎯 Best Practices

### Component Structure

```jsx
import { useState, useEffect } from "react";
import "./Component.css";

const Component = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  const handleEvent = () => {
    // Event handler
  };

  return <div className="component">{/* JSX */}</div>;
};

export default Component;
```

### API Route Structure

```javascript
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Public route
router.get("/public", async (req, res) => {
  try {
    // Logic
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route
router.post("/protected", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    // Logic
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

---

## 📚 Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Stripe Docs](https://stripe.com/docs)
- [Fake Store API](https://fakestoreapi.com)
- [Vite Docs](https://vitejs.dev)

---

**Happy Coding! 🚀**
