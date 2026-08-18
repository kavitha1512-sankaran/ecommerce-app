import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-app-frfh.onrender.com/api"
});

export default API;