import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Cart.css";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9 2L7 6H3L6 20H18L21 6H17L15 2H9Z" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="15" cy="21" r="1" />
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="btn btn-secondary btn-sm">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                <Link to={`/product/${item.productId}`} className="item-image">
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="item-details">
                  <Link
                    to={`/product/${item.productId}`}
                    className="item-title"
                  >
                    {item.title}
                  </Link>
                  <span className="item-category">{item.category}</span>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                </div>

                <div className="item-actions">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>
                Subtotal (
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                items)
              </span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success">FREE</span>
            </div>

            <div className="summary-row">
              <span>Tax (estimated)</span>
              <span>${(cart.totalAmount * 0.1).toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${(cart.totalAmount * 1.1).toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary btn-lg"
              style={{ width: "100%" }}
            >
              {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
            </button>

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
