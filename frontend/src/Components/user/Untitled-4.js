import React, { useState } from "react";
import "./Login.css";
import { FaUser, FaLock, FaUserPlus } from "react-icons/fa";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { username, password };
      const res = await api.post("/login", body);

      localStorage.setItem("LoginId", res.data.id);

      if (res.data.role === "Vendor") navigate("/Vndrhomepage");
      else if (res.data.role === "Admin") navigate("/homepage");
      else if (res.data.role === "User") navigate("/userhomepage");
      else navigate("/Wrkhomepage");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  const handleSignup = (e) => {
    const role = e.target.value;

    if (role === "User") navigate("/register-user");
    if (role === "Vendor") navigate("/register-vendor");
    if (role === "Worker") navigate("/register-worker");
  };

  return (
    <div className="loginpage">
      <form className="loginform" onSubmit={handlesubmit}>
        <h1 className="loginheading">🏗️ Construction Management</h1>

        {/* INTERACTIVE TEXT + SIGNUP */}
        <div className="signin-header">
          <p className="subtext">Sign in to continue</p>

          <div className="signup-inline">
            <FaUserPlus className="signup-icon" />
            <select defaultValue="" onChange={handleSignup}>
              <option value="" disabled>
                New here? Sign up as
              </option>
              <option value="User">User</option>
              <option value="Vendor">Vendor</option>
              <option value="Worker">Worker</option>
            </select>
          </div>
        </div>

        <div className="inputbox">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </div>

        <div className="inputbox">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>

        <button className="loginbtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
