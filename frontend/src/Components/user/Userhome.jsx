import React from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Userhome.css'

function Userhome() {
  return (
    <div className="user-home-page">
      <Container className="mt-5">
        <h2 className="text-center user-title">User Dashboard</h2>

        <Row className="g-4 mt-4">
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>View Products</Card.Title>
                <p>Products</p>
                <Link to="/userviewprdt" className="btn user-btn">Send Request</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Request Products */}
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Request Products</Card.Title>
                <p>Send request to vendors for required materials.</p>
                <Link to="/userreqprdct" className="btn user-btn">Send Request</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Request Worker by Category & Rating */}
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Request Worker</Card.Title>
                <p>Select worker category and rating to hire easily.</p>
                <Link to="/userreqworker" className="btn user-btn">Hire Worker</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Send Complaint */}
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Complaints</Card.Title>
                <p>Submit complaints to admin regarding issues.</p>
                <Link to="/sendcomplaint" className="btn user-btn">Send Complaint</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* View Worker */}
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>View Workers  </Card.Title>
                <p>Check responses to your complaints.</p>
                <Link to="/viewwrkrs" className="btn user-btn">View Reply</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Send Feedback to Vendor */}
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Send Feedback & Rating</Card.Title>
                <p>Give feedback to vendors about their service.</p>
                <Link to="/sendfeedback" className="btn user-btn">Send Feedback</Link>
              </Card.Body>
            </Card>
          </Col>

        

          {/* View & Add Project Details */}
          <Col md={4}>
            <Card className="user-card">
              <Card.Body className="text-center">
                <Card.Title>Project Details</Card.Title>
                <p>View or add information about your construction projects.</p>
                <Link to="/projectdetails" className="btn user-btn">Manage Projects</Link>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default Userhome

