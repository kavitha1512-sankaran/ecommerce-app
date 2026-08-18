import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  const order =
    JSON.parse(localStorage.getItem("order")) || {};

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.check}>
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p style={styles.message}>
          Thank you for your purchase.
        </p>

        <p>
          Your order has been received and will be
          processed soon.
        </p>

        <div style={styles.orderInfo}>
          <h3>Order Details</h3>

          <p>
            <strong>Name:</strong> {order.name}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Payment:</strong> {order.payment}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>

          <p>
            <strong>Order Date:</strong> {order.date}
          </p>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "600px",
    padding: "50px",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
    backgroundColor: "white",
  },

  check: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },

  message: {
    fontSize: "20px",
    color: "#555",
  },

  orderInfo: {
    marginTop: "25px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    textAlign: "left",
  },

  button: {
    marginTop: "25px",
    padding: "14px 30px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "7px",
    fontSize: "17px",
    cursor: "pointer",
  },
};

export default OrderSuccess;