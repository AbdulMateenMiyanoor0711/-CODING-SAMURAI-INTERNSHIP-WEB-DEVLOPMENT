import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const result = await addToCart(product);
    setIsAdding(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <div className="product-overlay">
          <span className="view-details">View Details</span>
        </div>
      </Link>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(product.rating?.rate || 0)
                    ? "star filled"
                    : "star"
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className="rating-count">({product.rating?.count || 0})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="price-symbol">$</span>
            <span className="price-value">{product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`btn-add-cart ${showSuccess ? "success" : ""}`}
          >
            {showSuccess ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 2L7 6H3L6 20H18L21 6H17L15 2H9Z" />
                </svg>
                {isAdding ? "Adding..." : "Add to Cart"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
