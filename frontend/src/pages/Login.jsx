import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-logo">
          AlgoForge
        </h1>

        <h2 className="auth-title">
          Welcome Back 👋
        </h2>

        <p className="auth-subtitle">
          Sign in to continue tracking your coding journey
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="auth-btn"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;