import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const addToCart = (product) => {
    // Get existing cart
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Product added to cart successfully!");

    // Go to cart
    navigate("/cart");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Our Products</h1>

        <button
          style={styles.cartButton}
          onClick={() => navigate("/cart")}
        >
          🛒 View Cart
        </button>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <div style={styles.card} key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h2>₹{product.price}</h2>

            <p>Category: {product.category}</p>

            <p>Stock: {product.stock}</p>

            <button
              style={styles.addButton}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  cartButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "7px",
    fontSize: "16px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },

  card: {
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  addButton: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "7px",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Products;