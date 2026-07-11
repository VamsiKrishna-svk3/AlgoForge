import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert("Registration successful!");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Registration failed"
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
          Create Account 🚀
        </h2>

        <p className="auth-subtitle">
          Start tracking your coding journey today
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>
              setUsername(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="auth-btn"
            type="submit"
          >

            {
              loading
              ? "Creating Account..."
              : "Register"
            }

          </button>

        </form>

        <div className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Register;