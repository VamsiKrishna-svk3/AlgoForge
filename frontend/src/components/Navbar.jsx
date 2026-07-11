import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/dashboard")}
      >
        AlgoForge
      </div>
      <div className="nav-links">
        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>
        <button
          onClick={() =>
            navigate("/add-problem")
          }
        >
          + Add Problem
        </button>
        <button
          className="logout"
          onClick={logout}
        >
          Logout
 </button>
      </div>
    </nav>
  );
}
export default Navbar;