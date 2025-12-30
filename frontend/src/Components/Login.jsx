import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Button, Form } from 'react-bootstrap';
import "./Login.css"; // We'll use this for background and minor styling

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { username, password };
    try {
      const res = await api.post("/login", body);
      localStorage.setItem("LoginId", res.data.id);

      if (res.data.role === "Vendor") navigate("/Vndrhomepage");
      else if (res.data.role === "Admin") navigate("/homepage");
      else if (res.data.role === "User") navigate("/userhomepage");
      else navigate("/Wrkhomepage");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Construction</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Sign Up" id="basic-nav-dropdown">
                <NavDropdown.Item href="/userregistration">User</NavDropdown.Item>
                <NavDropdown.Item href="/venderregistration">Vendor</NavDropdown.Item>
                <NavDropdown.Item href="/workerregistration">Worker</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Form with Background */}
      <div className="login-background d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleSubmit} className="login-card p-4 shadow-lg rounded">
          <h3 className="text-center mb-4">Login</h3>
          
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <div className="d-flex align-items-center">
              <FaUser className="me-2" />
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="d-flex align-items-center">
              <FaLock className="me-2" />
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
