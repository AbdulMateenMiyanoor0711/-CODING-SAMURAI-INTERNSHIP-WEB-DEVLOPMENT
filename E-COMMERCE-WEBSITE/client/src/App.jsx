import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <footer className="footer">
              <div className="container">
                <div className="footer-content">
                  <div className="footer-section">
                    <h3>ShopHub</h3>
                    <p>
                      Your premium shopping destination for quality products at
                      great prices.
                    </p>
                  </div>
                  <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/products">Products</a>
                      </li>
                      <li>
                        <a href="/cart">Cart</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-section">
                    <h4>Customer Service</h4>
                    <ul>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                      <li>
                        <a href="#">Shipping Info</a>
                      </li>
                      <li>
                        <a href="#">Returns</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                      <a href="#" aria-label="Facebook">
                        📘
                      </a>
                      <a href="#" aria-label="Twitter">
                        🐦
                      </a>
                      <a href="#" aria-label="Instagram">
                        📷
                      </a>
                    </div>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; 2026 ShopHub. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
