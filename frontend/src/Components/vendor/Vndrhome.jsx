import React, { useEffect } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Vndrhome.css'
import api from '../../api';

function Vndrhome() {
  const LoginId = localStorage.getItem("LoginId");
  const navigate = useNavigate();

  // Fetch shop id
  const getShop = async () => {
    try {
      const res = await api.get(`/vendor/details/${LoginId}`);
      localStorage.setItem('vendorId', res.data.shop._id);
    } catch (error) {
      console.error("Failed to fetch shop:", error);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="vendor-home-page">

      {/* 🔴 LOGOUT BUTTON */}
      <div className="d-flex justify-content-end p-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Container className="mt-3">
        <h2 className="text-center vendor-title">Vendor Dashboard</h2>

        <Row className="g-4 mt-4">

          {/* Add Products */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>Add Products</Card.Title>
                <p>Add new construction materials or tools to your catalog.</p>
                <Link to="/addprdpage" className="btn vendor-btn">
                  Add Product
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Manage Product */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>Manage Product</Card.Title>
                <p>Product details</p>
                <Link to="/viewprdt" className="btn vendor-btn">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Update Status */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>Update Status</Card.Title>
                <p>Product Status Update</p>
                <Link to="/VendorUpdateStatus" className="btn vendor-btn">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* View Requests */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>View Requests</Card.Title>
                <p>Check material requests from users or admin.</p>
                <Link to="/viewrequests" className="btn vendor-btn">
                  View Requests
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* View Feedback */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>View Feedback</Card.Title>
                <p>See feedback given by users for your services.</p>
                <Link to="/VendorViewFeedback" className="btn vendor-btn">
                  View Feedback
                </Link>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Vndrhome;
