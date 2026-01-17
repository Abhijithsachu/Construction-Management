import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaUsers, FaStore, FaHardHat, FaProjectDiagram } from "react-icons/fa";
import Navpage from "./Navpage";
import api from "../../api"; // make sure your api instance is configured
import "./Homepage.css";

function HomePage() {
  const [counts, setCounts] = useState({
    users: 0,
    vendors: 0,
    workers: 0,
    projects: 0,
  });

  // Fetch counts from API
  const fetchCounts = async () => {
    try {
      const [usersRes, vendorsRes, workersRes, projectsRes] = await Promise.all([
        api.get("/user/viewUser"),
        api.get("/vendor/viewvendor"),
        api.get("/worker/all"),
        api.get("/project/adminviewproject"),
      ]);

      setCounts({
        users: usersRes.data.user.length,
        vendors: vendorsRes.data.vendor.length,
        workers: workersRes.data.workerDetails.length,
        projects: projectsRes.data.project.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="homepage">
      <Navpage />

      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <Container className="mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="dashboard-heading text-white">Admin Dashboard</h2>
        </div>

        <Row className="g-4">
          {/* Users Card */}
          <Col md={3} sm={6}>
            <Card className="dashboard-card hover-shadow text-center h-100">
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                <div>
                  <Card.Title className="card-title">
                    <FaUsers className="me-2" /> Total Users
                  </Card.Title>
                  <h3 className="card-number text-primary">{counts.users}</h3>
                  <p className="card-label">Users Registered</p>
                </div>
                <Link to="/adminviewuser" className="card-btn btn btn-primary mt-3">
                  View Users
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Vendors Card */}
          <Col md={3} sm={6}>
            <Card className="dashboard-card hover-shadow text-center h-100">
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                <div>
                  <Card.Title className="card-title">
                    <FaStore className="me-2" /> Vendors Pending
                  </Card.Title>
                  <h3 className="card-number text-danger">{counts.vendors}</h3>
                  <p className="card-label">Vendors Awaiting Approval</p>
                </div>
                <Link to="/adminverifyvendor" className="card-btn btn btn-danger mt-3">
                  Verify Vendors
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Workers Card */}
          <Col md={3} sm={6}>
            <Card className="dashboard-card hover-shadow text-center h-100">
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                <div>
                  <Card.Title className="card-title">
                    <FaHardHat className="me-2" /> Workers Registered
                  </Card.Title>
                  <h3 className="card-number text-success">{counts.workers}</h3>
                  <p className="card-label">Workers Available</p>
                </div>
                <Link to="/adminviewworker" className="card-btn btn btn-success mt-3">
                  View Workers
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Projects Card */}
          <Col md={3} sm={6}>
            <Card className="dashboard-card hover-shadow text-center h-100">
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                <div>
                  <Card.Title className="card-title">
                    <FaProjectDiagram className="me-2" /> Projects
                  </Card.Title>
                  <h3 className="card-number text-info">{counts.projects}</h3>
                  <p className="card-label">Total Projects</p>
                </div>
                <Link to="/viewprojects" className="card-btn btn btn-info mt-3">
                  View Projects
                </Link>
              </Card.Body>
            </Card>
          </Col>
           <Col md={3} sm={6}>
            <Card className="dashboard-card hover-shadow text-center h-100">
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                <div>
                  <Card.Title className="card-title">
                    <FaHardHat className="me-2" /> Complaints
                  </Card.Title>
                  <h3 className="card-number text-success">{counts.workers}</h3>
                  <p className="card-label">View Complaints</p>
                </div>
                <Link to="/adminviewcomplaint" className="card-btn btn btn-success mt-3">
                  Complaint
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
