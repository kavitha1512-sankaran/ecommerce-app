const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getAllOrders
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

// Create order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/", protect, getOrders);

// Admin: get all orders
router.get("/all", protect, getAllOrders);

module.exports = router;