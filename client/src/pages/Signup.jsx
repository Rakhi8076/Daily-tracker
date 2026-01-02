import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

function Signup() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/user/signup", user);

      if (res.data.success) {
        setSuccess("Signup Successful 🎉");

        try {
          const loginRes = await api.post("/user/login", {
            email: user.email,
            password: user.password
          });

          if (loginRes.data.success) {
            localStorage.setItem("token", loginRes.data.token);

            api.defaults.headers.common["Authorization"] =
              `Bearer ${loginRes.data.token}`;

            setTimeout(() => navigate("/dashboard"), 1200);
          }

        } catch {
          setError("Signup done but login failed, please login manually ❌");
        }

      } else {
        setError(res.data.message || "Signup Failed ❌");
      }

    } catch (err) {
      setError("Signup Failed ❌");
      console.log("SIGNUP ERROR", err);
    }
  };

  return (
    <div style={{ width: "350px", margin: "auto" }}>
      <h2>Signup</h2>

      {success && (
        <div style={{
          background: "green",
          color: "white",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}>
          {success}
        </div>
      )}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      <form onSubmit={submitSignup}>

        <input
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>

      </form>
    </div>
  );
}

export default Signup;
