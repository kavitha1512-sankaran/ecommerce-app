import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-app-frfh.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;