import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Navpage from "./Navpage";
import "./Homepage.css";

function HomePage() {
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Navpage />

      <Container className="mt-4">
        {/* 🔴 HEADER WITH LOGOUT */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">Admin Dashboard</h2>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Row className="g-4">

          {/* Users Card */}
          <Col md={4}>
            <Card className="p-3 shadow-lg border-0 rounded-4 hover-shadow">
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">Total Users</Card.Title>
                <h3 className="text-primary fw-bold mt-2">120</h3>
                <Link
                  to="/adminviewuser"
                  className="btn btn-primary mt-3 px-4 rounded-pill"
                >
                  View Users
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Vendor Card */}
          <Col md={4}>
            <Card className="p-3 shadow-lg border-0 rounded-4 hover-shadow">
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">Vendors Pending</Card.Title>
                <h3 className="text-danger fw-bold mt-2">18</h3>
                <Link
                  to="/adminverifyvendor"
                  className="btn btn-danger mt-3 px-4 rounded-pill"
                >
                  Verify Vendors
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Worker Card */}
          <Col md={4}>
            <Card className="p-3 shadow-lg border-0 rounded-4 hover-shadow">
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">
                  Workers Registered
                </Card.Title>
                <h3 className="text-success fw-bold mt-2">75</h3>
                <Link
                  to="/adminviewworker"
                  className="btn btn-success mt-3 px-4 rounded-pill"
                >
                  View Workers
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* projects Card */}
          <Col md={4}>
            <Card className="p-3 shadow-lg border-0 rounded-4 hover-shadow">
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">
                  Projects
                </Card.Title>
                <h3 className="text-success fw-bold mt-2">75</h3>
                <Link
                  to="/viewprojects"
                  className="btn btn-success mt-3 px-4 rounded-pill"
                >
                  View Projects
                </Link>
              </Card.Body>
            </Card>
          </Col>  

        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
