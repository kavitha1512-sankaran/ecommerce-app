import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./components/pages/Checkout";
import OrderSuccess from "./components/OrderSucess";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* Any unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;