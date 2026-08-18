import React, { useState } from "react";
import API from "./api";

function AdminDashboard() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        image: product.image
      });

      setMessage("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Failed to add product."
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}
    </div>
  );
}

export default AdminDashboard;