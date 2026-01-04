import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import "../styles/Signup.css";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // ✅ SIGNUP (correct route)
      const res = await api.post("/users/signup", user);

      if (!res.data?.success) {
        setError(res.data?.message || "Signup failed ❌");
        return;
      }

      setSuccess("Signup successful 🎉 Logging you in...");

      // ✅ AUTO LOGIN
      const loginRes = await api.post("/users/login", {
        email: user.email,
        password: user.password,
      });

      if (loginRes.data?.success) {
        const token = loginRes.data.token;

        // store token
        localStorage.setItem("token", token);

        // set default header
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // redirect
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError("Signup done but login failed ❌");
      }

    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>

      {success && <div className="success-msg">{success}</div>}
      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={submitSignup} className="signup-form">
        <input
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;

