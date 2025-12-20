import React, { useEffect } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Vndrhome.css'
import api from '../../api';
function Vndrhome() {
  const LoginId = localStorage.getItem("LoginId");

  // Fetch shop id
  const getShop = async () => {
    try {
      const res = await api.get(`/vendor/details/${LoginId}`);
      localStorage.setItem('vendorId',res.data.shop._id)
      console.log(res);
      
    } catch (error) {
      console.error("Failed to fetch shop:", error);
    }
  };
useEffect(()=>{
  getShop()
})
  return (
    
    <div className="vendor-home-page">
      <Container className="mt-5">
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

          {/* Add Product Image */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>View Product</Card.Title>
                <p>Product details</p>
                <Link to="/viewprdt" className="btn vendor-btn">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Update Stock */}
          <Col md={4}>
            <Card className="vendor-card">
              <Card.Body className="text-center">
                <Card.Title>Update Stock</Card.Title>
                <p>Manage and update available stock quantities.</p>
                <Link to="/vendor/updatestock" className="btn vendor-btn">
                  Update Stock
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
                <Link to="/vendor/viewrequests" className="btn vendor-btn">
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
                <Link to="/vendor/viewfeedback" className="btn vendor-btn">
                  View Feedback
                </Link>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default Vndrhome
