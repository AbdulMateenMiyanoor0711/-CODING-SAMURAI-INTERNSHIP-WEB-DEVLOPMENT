const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Cart = require("../models/Cart");

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, title, price, image, quantity, category } = req.body;

    if (!productId || !title || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      // Add new item
      cart.items.push({
        productId,
        title,
        price,
        image,
        quantity: quantity || 1,
        category,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
});

// @route   PUT /api/cart/:productId
// @desc    Update cart item quantity
// @access  Private
router.put("/:productId", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = parseInt(req.params.productId);

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ message: "Error removing from cart", error: error.message });
  }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error clearing cart:", error);
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
});

module.exports = router;
