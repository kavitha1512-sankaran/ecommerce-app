import React from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Product Details</h1>

      <p>Product ID: {id}</p>

      <Link to="/products">
        ← Back to Products
      </Link>
    </div>
  );
}

export default ProductDetails;