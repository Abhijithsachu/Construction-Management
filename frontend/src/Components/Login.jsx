import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Button, Form, InputGroup } from 'react-bootstrap';
import "./Login.css";

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
      alert("Invalid credentials");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand className="fw-bold">🏗️ Construction Hub</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <NavDropdown title="Sign Up">
                <NavDropdown.Item href="/userregistration">User</NavDropdown.Item>
                <NavDropdown.Item href="/venderregistration">Vendor</NavDropdown.Item>
                <NavDropdown.Item href="/workerregistration">Worker</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Section */}
      <div className="login-bg">
        <div className="login-glass p-4">
          <h2 className="text-center fw-bold mb-1">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Login to your account</p>

          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="bg-transparent text-white">
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup className="mb-4">
              <InputGroup.Text className="bg-transparent text-white">
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>

            <Button type="submit" className="login-btn w-100">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
