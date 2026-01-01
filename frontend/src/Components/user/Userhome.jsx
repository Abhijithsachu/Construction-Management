import React, { useEffect } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Userhome.css'
import api from '../../api';

function Userhome() {
  const LoginId = localStorage.getItem("LoginId");
  const navigate = useNavigate();

  // Fetch user id
  const getUser = async () => {
    try {
      const res = await api.get(`/user/details/${LoginId}`);
      localStorage.setItem('userId', res.data.user._id);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="user-home-page">
      {/* 🔴 LOGOUT BUTTON */}
      <div className="d-flex justify-content-end p-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Container className="mt-3">
        <h2 className="text-center user-title">User Dashboard</h2>

        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>View Products</Card.Title>
                <p>Products</p>
                <Link to="/userviewprdt" className="btn user-btn">
                  Send Request
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Requested Products</Card.Title>
                <p>Send request to vendors for required materials.</p>
                <Link to="/userreqprdct" className="btn user-btn">
                  Send Request
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Requested Worker</Card.Title>
                <p>Select worker category and rating to hire easily.</p>
                <Link to="/userreqworker" className="btn user-btn">
                  Hire Worker
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Complaints</Card.Title>
                <p>Submit complaints to admin regarding issues.</p>
                <Link to="/sendcomplaint" className="btn user-btn">
                  Send Complaint
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>View Workers</Card.Title>
                <p>Check responses to your complaints.</p>
                <Link to="/viewwrkrs" className="btn user-btn">
                  View Reply
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Send Feedback & Rating</Card.Title>
                <p>Give feedback to vendors about their service.</p>
                <Link to="/sendfeedback" className="btn user-btn">
                  Send Feedback
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Project Details</Card.Title>
                <p>View or add information about your construction projects.</p>
                <Link to="/projectdetails" className="btn user-btn">
                  Manage Projects
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Userhome;
