import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Remove product
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) - 1, 1),
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div style={styles.empty}>
          <h2>Your cart is currently empty.</h2>

          <button
            style={styles.shopButton}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div style={styles.cartContainer}>
            {cart.map((item) => (
              <div style={styles.cartItem} key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.image}
                />

                <div style={styles.details}>
                  <h2>{item.name}</h2>

                  <p>{item.description}</p>

                  <h3>₹{item.price}</h3>

                  <div style={styles.quantityContainer}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>

                    <span style={styles.quantity}>
                      {item.quantity || 1}
                    </span>

                    <button
                      style={styles.quantityButton}
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2>Cart Summary</h2>

            <h3>
              Total: ₹{total}
            </h3>

            <button
              style={styles.checkoutButton}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              style={styles.continueButton}
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    fontSize: "38px",
    marginBottom: "30px",
  },

  empty: {
    textAlign: "center",
    padding: "80px 20px",
  },

  shopButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "14px 30px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "20px",
  },

  cartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  cartItem: {
    display: "flex",
    gap: "25px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },

  image: {
    width: "180px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  details: {
    flex: 1,
  },

  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "15px",
  },

  quantityButton: {
    width: "35px",
    height: "35px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },

  quantity: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  removeButton: {
    marginTop: "15px",
    padding: "10px 18px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  summary: {
    marginTop: "30px",
    padding: "25px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    textAlign: "right",
  },

  checkoutButton: {
    padding: "13px 25px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },

  continueButton: {
    padding: "13px 25px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Cart;