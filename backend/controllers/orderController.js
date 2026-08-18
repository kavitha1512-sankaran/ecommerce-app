const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items in order"
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
};


// Get logged-in user's orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to get orders",
      error: error.message
    });
  }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      message: "Failed to get all orders",
      error: error.message
    });
  }
};