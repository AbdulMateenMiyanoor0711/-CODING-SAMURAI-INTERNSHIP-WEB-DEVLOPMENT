const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Validate shipping address
    if (
      !shippingAddress ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipCode ||
      !shippingAddress.country
    ) {
      return res
        .status(400)
        .json({ message: "Complete shipping address is required" });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order
    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      totalAmount: cart.totalAmount,
      shippingAddress,
      paymentInfo: {
        method: paymentMethod || "card",
        status: "pending",
      },
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// @route   POST /api/orders/create-payment-intent
// @desc    Create Stripe payment intent
// @access  Private
router.post("/create-payment-intent", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cart.totalAmount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        userId: req.user._id.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res
      .status(500)
      .json({ message: "Error creating payment intent", error: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      orderDate: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
});

module.exports = router;
