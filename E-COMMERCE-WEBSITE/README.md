# E-Commerce MERN Application

A full-stack e-commerce website built with the MERN stack (MongoDB, Express, React, Node.js) using the Fake Store API.

## Features

- 🛍️ Product catalog with categories
- 🔐 User authentication (Register/Login)
- 🛒 Shopping cart functionality
- 💳 Stripe payment gateway integration
- 📱 Responsive design
- 🎨 Modern UI with animations
- 💾 MongoDB for data persistence
- 🔒 Secure JWT authentication

## Tech Stack

**Frontend:**

- React 18
- Vite
- React Router
- Axios
- Context API for state management

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Stripe for payments

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe account (for payment integration)

### Installation

1. Clone the repository
2. Install all dependencies:

```bash
npm run install-all
```

3. Create `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Create `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Running the Application

Development mode (runs both client and server):

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS files
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   └── config/            # Configuration files
└── package.json           # Root package.json
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Products

- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- GET `/api/products/category/:category` - Get products by category

### Cart

- GET `/api/cart` - Get user cart
- POST `/api/cart` - Add item to cart
- PUT `/api/cart/:id` - Update cart item
- DELETE `/api/cart/:id` - Remove item from cart

### Orders

- POST `/api/orders` - Create new order
- GET `/api/orders` - Get user orders

## License

MIT
