import axios from "axios";

const api = axios.create({
  baseURL: "https://daily-tracker-402u.onrender.com/api"   // ← your backend URL
});

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
