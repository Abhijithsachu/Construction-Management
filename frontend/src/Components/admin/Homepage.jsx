import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import Navpage from "./Navpage";

function HomePage() {
  return (
    <div>
      <Navpage></Navpage>
      {/* DASHBOARD */}
      <Container className="mt-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <Row className="g-4">

          {/* Users Card */}
          <Col md={4}>
            <Card className="shadow-sm text-center p-3">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <h3 style={{color:"#0d6efd"}}>120</h3>
                <Link to="/adminviewuser" className="btn btn-primary mt-2">View Users</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Vendor Card */}
          <Col md={4}>
            <Card className="shadow-sm text-center p-3">
              <Card.Body>
                <Card.Title>Vendors Pending</Card.Title>
                <h3 style={{color:"#d9534f"}}>18</h3>
                <Link to="/adminverifyvendor" className="btn btn-danger mt-2">
                  Verify Vendors
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Worker Card */}
          <Col md={4}>
            <Card className="shadow-sm text-center p-3">
              <Card.Body>
                <Card.Title>Workers Registered</Card.Title>
                <h3 style={{color:"#198754"}}>75</h3>
                <Link to="/adminviewworker" className="btn btn-success mt-2">
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
