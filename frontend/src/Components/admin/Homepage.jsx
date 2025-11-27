import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import Navpage from "./Navpage";
import './Homepage.css'
function HomePage() {
  return (
    <div>
      <Navpage />

      <Container className="mt-4">
        <h2 className="text-center fw-bold text-primary mb-4">Admin Dashboard</h2>

        <Row className="g-4">

          {/* Users Card */}
          <Col md={4}>
            <Card className="p-3 shadow-lg border-0 rounded-4 hover-shadow">
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">Total Users</Card.Title>
                <h3 className="text-primary fw-bold mt-2">120</h3>
                <Link to="/adminviewuser" className="btn btn-primary mt-3 px-4 rounded-pill">
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
                <Link to="/adminverifyvendor" className="btn btn-danger mt-3 px-4 rounded-pill">
                  Verify Vendors
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Worker Card */}
          <Col md={4}>
            <Card className="p-3 shadow-lg border-0 rounded-4 hover-shadow">
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">Workers Registered</Card.Title>
                <h3 className="text-success fw-bold mt-2">75</h3>
                <Link to="/adminviewworker" className="btn btn-success mt-3 px-4 rounded-pill">
                  View Workers
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
