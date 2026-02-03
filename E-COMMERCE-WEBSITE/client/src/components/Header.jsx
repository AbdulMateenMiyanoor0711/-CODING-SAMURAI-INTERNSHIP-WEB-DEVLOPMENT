import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopHub</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            {isAuthenticated && (
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            )}
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 2L7 6H3L6 20H18L21 6H17L15 2H9Z" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="15" cy="21" r="1" />
              </svg>
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Hi, {user?.name || "User"}</span>
                <button onClick={logout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
