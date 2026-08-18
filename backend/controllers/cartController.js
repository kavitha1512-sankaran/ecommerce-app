const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Product is out of stock"
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity: quantity
          }
        ]
      });

      await cart.save();

      return res.status(201).json({
        message: "Product added to cart",
        cart
      });
    }

    // Check whether product already exists
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity
      });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product");

    res.status(200).json({
      message: "Product added to cart",
      cart: updatedCart
    });

  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message
    });
  }
};


// GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart) {
      return res.json({
        items: []
      });
    }

    res.json(cart);

  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      message: "Failed to get cart",
      error: error.message
    });
  }
};


// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product");

    res.json({
      message: "Product removed from cart",
      cart: updatedCart
    });

  } catch (error) {
    console.error("Remove cart error:", error);

    res.status(500).json({
      message: "Failed to remove product",
      error: error.message
    });
  }
};