import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          Welcome to Our E-Commerce Store
        </h1>

        <p style={styles.subtitle}>
          Find the best products at great prices.
        </p>

        <div style={styles.buttons}>

          <button
            style={styles.loginButton}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.productButton}
            onClick={() => navigate("/products")}
          >
            View Products
          </button>

        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    padding: "20px",
    boxSizing: "border-box"
  },

  card: {
    width: "600px",
    maxWidth: "90%",
    background: "#ffffff",
    padding: "60px 40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
  },

  title: {
    fontSize: "42px",
    color: "#1f2937",
    marginBottom: "20px",
    lineHeight: "1.2"
  },

  subtitle: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "40px"
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  loginButton: {
    padding: "14px 35px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  productButton: {
    padding: "14px 35px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Home;