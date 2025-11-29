import React from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="loginpage">

      <form className="loginform">
        <h1 className="loginheading">Construction Management</h1>

        <div className="inputbox">
          <FaUser className="icon" />
          <input type="text" placeholder="Username" />
        </div>

        <div className="inputbox">
          <FaLock className="icon" />
          <input type="password" placeholder="Password" />
        </div>

        <button className="loginbtn" type="submit">
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;

