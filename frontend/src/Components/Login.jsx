import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHardHat,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", { username, password });

      if (res.data.role === "Vendor") {
      localStorage.setItem("VLoginId", res.data.id);

        navigate("/Vndrhomepage");

      }
      else if (res.data.role === "Admin") {navigate("/homepage");

      }
      else if (res.data.role === "User") {
      localStorage.setItem("ULoginId", res.data.id);
        
        navigate("/userhomepage");
      
      }
      else if(res.data.role === "Worker"){
      localStorage.setItem("WLoginId", res.data.id);

      navigate("/Wrkhomepage");

    }
  } catch (error) {
      alert(
        error.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        className="navbar-premium"
      >
        <Container>
          <Navbar.Brand className="brand-text">
            <FaHardHat className="me-2 text-warning" />
          NIRMITHI
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <NavDropdown title="Register">
                <NavDropdown.Item href="/userregistration">
                  User
                </NavDropdown.Item>
                <NavDropdown.Item href="/venderregistration">
                  Vendor
                </NavDropdown.Item>
                <NavDropdown.Item href="/workerregistration">
                  Worker
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ===== PAGE ===== */}
      <div className="login-page">
        {/* Background elements */}
        <div className="bg-shape one"></div>
        <div className="bg-shape two"></div>
        <div className="bg-shape three"></div>
        <div className="vignette"></div>

        {/* Main content */}
        <div className="login-wrapper">
          {/* LEFT INFO */}
          <div className="login-info">
            <h2>Construction Management Platform</h2>
            <p>
              A centralized system for planning, monitoring, and managing
              construction projects with role-based secure access.
            </p>

            <ul>
              <li>Project & Resource Planning</li>
              <li>Vendor & Workforce Coordination</li>
              <li>Real-time Progress Monitoring</li>
            </ul>
          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="login-card">
            <h3>Sign in</h3>
            <p className="subtitle">
              Enter your credentials to continue
            </p>

            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Button */}
              <Button
                type="submit"
                className="login-btn-premium w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className="login-footer">
                Secure access for Users, Vendors & Workers
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
