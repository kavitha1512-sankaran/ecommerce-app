import React from "react";
import API from "../api";

const ProductCard = ({ product }) => {

  const addToCart = async () => {
    try {
      // Get login token
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      console.log("Product ID:", product._id);

      const response = await API.post(
        "/cart",
        {
          productId: product._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Cart response:", response.data);

      alert("Product added to cart successfully!");

    } catch (error) {
      console.error("Add to cart error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
          "Failed to add product to cart"
        );
      } else {
        alert("Cannot connect to server");
      }
    }
  };

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <p>
        Category: {product.category}
      </p>

      <p>
        Stock: {product.stock}
      </p>

      <button
        type="button"
        onClick={addToCart}
        className="add-cart-btn"
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;