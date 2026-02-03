import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get("/api/products?limit=8");
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your
              <span className="gradient-text"> Perfect Style</span>
            </h1>
            <p className="hero-description">
              Explore our curated collection of premium products at unbeatable
              prices. Shop the latest trends and timeless classics.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                Browse Categories
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">🎨</div>
              <div className="card-text">Premium Quality</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🚚</div>
              <div className="card-text">Fast Delivery</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">💳</div>
              <div className="card-text">Secure Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Premium Products</h3>
              <p>Handpicked selection of the finest quality items</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Shopping</h3>
              <p>Your data is protected with industry-leading security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Shipping</h3>
              <p>Quick delivery to your doorstep, worldwide</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>100% Satisfaction</h3>
              <p>Money-back guarantee on all purchases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Discover our most popular items</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading amazing products...</p>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/products" className="btn btn-primary">
              View All Products
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>
              Join thousands of satisfied customers and find your perfect
              products today
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
