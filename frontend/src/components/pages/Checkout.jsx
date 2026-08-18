import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const placeOrder = (e) => {
    e.preventDefault();

    if (!name || !address || !phone) {
      alert("Please fill all the details");
      return;
    }

    // Create order
    const order = {
      name,
      address,
      phone,
      payment,
      products: cart,
      total,
      date: new Date().toLocaleString(),
    };

    // Save order
    localStorage.setItem("order", JSON.stringify(order));

    // Empty cart
    localStorage.removeItem("cart");

    // Go to success page
    navigate("/order-success");
  };

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>

      <div style={styles.content}>
        <div style={styles.formBox}>
          <h2>Delivery Details</h2>

          <form onSubmit={placeOrder}>
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Address</label>

            <textarea
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Payment Method</label>

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit / Debit Card</option>
            </select>

            <button type="submit" style={styles.placeButton}>
              Place Order
            </button>
          </form>
        </div>

        <div style={styles.summary}>
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item._id} style={styles.product}>
              <span>
                {item.name} × {item.quantity || 1}
              </span>

              <span>
                ₹{Number(item.price) * (item.quantity || 1)}
              </span>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total}</h2>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginTop: "30px",
  },

  formBox: {
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },

  summary: {
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#f5f5f5",
    height: "fit-content",
  },

  product: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginTop: "15px",
    marginBottom: "5px",
    fontWeight: "bold",
  },

  placeButton: {
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Checkout;