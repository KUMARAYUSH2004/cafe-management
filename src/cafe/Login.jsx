import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateUser, startSession } from "../utils/auth";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const result = validateUser(username, password);
    if (result.success) {
      startSession(result.user);
      navigate("/dashboard");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <span>Don't have an account? </span>
          <Link to="/signup" style={{ color: "#2563eb", textDecoration: "none" }}>
            Sign Up
          </Link>
        </div>

        <p className="login-footer">© Cafe Billing System</p>
      </div>
    </div>
  );
}

export default Login;

