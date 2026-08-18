const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        name: String,

        quantity: Number,

        price: Number
      }
    ],

    shippingAddress: {
      address: String,
      city: String,
      postalCode: String
    },

    totalPrice: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery"
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);