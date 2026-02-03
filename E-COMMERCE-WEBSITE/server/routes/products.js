const express = require("express");
const router = express.Router();
const axios = require("axios");

const FAKE_STORE_API = "https://fakestoreapi.com";

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { limit, sort } = req.query;
    let url = `${FAKE_STORE_API}/products`;

    const params = [];
    if (limit) params.push(`limit=${limit}`);
    if (sort) params.push(`sort=${sort}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${FAKE_STORE_API}/products/${req.params.id}`,
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching product:", error);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get("/categories/all", async (req, res) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/products/categories`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get("/category/:category", async (req, res) => {
  try {
    const response = await axios.get(
      `${FAKE_STORE_API}/products/category/${req.params.category}`,
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({
        message: "Error fetching products by category",
        error: error.message,
      });
  }
});

module.exports = router;
