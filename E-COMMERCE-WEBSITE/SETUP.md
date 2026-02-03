# E-Commerce MERN Stack Application - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com/)

## Quick Start

### 1. Install Dependencies

Open your terminal in the project root directory and run:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### 2. Configure Environment Variables

#### Server Configuration

The server `.env` file is already created at `server/.env`. Update these values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NODE_ENV=development
```

**Important:**

- If using MongoDB Atlas, replace `MONGODB_URI` with your connection string
- For Stripe integration, get your keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
- Change `JWT_SECRET` to a random secure string in production

#### Client Configuration

The client `.env` file is already created at `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
```

### 3. Start MongoDB

If using local MongoDB:

```bash
# Windows (run as administrator)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

If using MongoDB Atlas, ensure your connection string is in `server/.env`

### 4. Run the Application

From the project root directory:

```bash
# Run both client and server concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## Features

✅ **User Authentication**

- Register new account
- Login/Logout
- JWT token-based authentication
- Protected routes

✅ **Product Catalog**

- Browse all products from Fake Store API
- Filter by category
- Sort by price and rating
- Product details page

✅ **Shopping Cart**

- Add/remove items
- Update quantities
- Persistent cart (localStorage for guests, MongoDB for users)
- Real-time total calculation

✅ **Checkout & Payments**

- Stripe payment integration
- Order management
- Order history

✅ **Premium UI/UX**

- Modern dark theme
- Smooth animations
- Responsive design
- Glassmorphism effects

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products (Fake Store API)

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/all` - Get all categories
- `GET /api/products/category/:category` - Get products by category

### Cart (Protected)

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Protected)

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/       # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Cart.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Express backend
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   ├── index.js          # Server entry point
│   └── package.json
│
├── package.json          # Root package.json
└── README.md
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check your connection string in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use

- Change `PORT` in `server/.env`
- Update `VITE_API_URL` in `client/.env` accordingly

### CORS Errors

- Ensure server is running on port 5000
- Check Vite proxy configuration in `client/vite.config.js`

### Stripe Integration

- Get test API keys from Stripe Dashboard
- Use test card: `4242 4242 4242 4242`
- Any future expiry date and any 3-digit CVC

## Development Tips

1. **Hot Reload**: Both client and server support hot reload during development
2. **API Testing**: Use tools like Postman or Thunder Client for API testing
3. **Database GUI**: Use MongoDB Compass to view your database
4. **React DevTools**: Install React Developer Tools browser extension

## Building for Production

```bash
# Build client
cd client
npm run build

# The build files will be in client/dist
```

## Next Steps

- [ ] Add product detail page
- [ ] Implement order tracking
- [ ] Add user profile page
- [ ] Implement wishlist feature
- [ ] Add product reviews
- [ ] Email notifications
- [ ] Admin dashboard

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review the code comments
3. Check the Fake Store API documentation: https://fakestoreapi.com/

## License

MIT License - Feel free to use this project for learning and development!
