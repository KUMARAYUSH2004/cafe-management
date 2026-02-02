import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../utils/auth";
import "./Login.css"; // Reusing Login styles for consistency

function Signup() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [role, setRole] = useState("Staff"); // Default role

    const handleSignup = () => {
        if (!name || !username || !password) {
            alert("Please fill in all fields");
            return;
        }

        const result = addUser({ name, username, password, role });
        if (result.success) {
            alert(result.message);
            navigate("/");
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign Up</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="role-select"
                    style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc" }}
                >
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                </select>

                <button onClick={handleSignup}>Sign Up</button>

                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <span>Already have an account? </span>
                    <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>
                        Login
                    </Link>
                </div>

                <p className="login-footer">© Cafe Billing System</p>
            </div>
        </div>
    );
}

export default Signup;
