import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load cart from localStorage for non-authenticated users
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [isAuthenticated]);

  // Save cart to localStorage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated && cart.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      if (isAuthenticated) {
        const response = await axios.post("/api/cart", {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
          category: product.category,
        });
        setCart(response.data);
      } else {
        // Handle local cart for non-authenticated users
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId === product.id,
        );

        let newItems;
        if (existingItemIndex > -1) {
          newItems = [...cart.items];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          newItems = [
            ...cart.items,
            {
              productId: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity,
              category: product.category,
            },
          ];
        }

        const totalAmount = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        setCart({ items: newItems, totalAmount });
      }
      return { success: true };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Failed to add item to cart" };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (isAuthenticated) {
        const response = await axios.put(`/api/cart/${productId}`, {
          quantity,
        });
        setCart(response.data);
      } else {
        const newItems = cart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );

        const totalAmount = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        setCart({ items: newItems, totalAmount });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        const response = await axios.delete(`/api/cart/${productId}`);
        setCart(response.data);
      } else {
        const newItems = cart.items.filter(
          (item) => item.productId !== productId,
        );
        const totalAmount = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        setCart({ items: newItems, totalAmount });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await axios.delete("/api/cart");
      }
      setCart({ items: [], totalAmount: 0 });
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getCartCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
