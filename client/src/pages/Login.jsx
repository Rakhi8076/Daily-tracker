import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/user/login", user);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.token}`;

        setSuccess("Login Successful 🎉");
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setError(res.data.message || "Something went wrong");
      }

    } catch {
      setError("Wrong Email or Password ❌");
    }
  };

  return (
    <div style={{ width:"350px", margin:"auto" }}>
      <h2>Login</h2>

      {success && (
        <div style={{
          background:"green",
          color:"white",
          padding:"10px",
          borderRadius:"6px",
          marginBottom:"10px",
          textAlign:"center",
          fontWeight:"bold"
        }}>
          {success}
        </div>
      )}

      {error && (
        <p style={{ color:"red", fontWeight:"bold" }}>{error}</p>
      )}

      <form onSubmit={submitLogin}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ width:"100%", padding:"8px", marginBottom:"10px" }}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          style={{ width:"100%", padding:"8px", marginBottom:"10px" }}
        />

        <button
          style={{
            width:"100%",
            padding:"8px",
            background:"#2563eb",
            color:"white",
            borderRadius:"6px",
            border:"none"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
