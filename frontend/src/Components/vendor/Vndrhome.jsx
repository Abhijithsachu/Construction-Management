import React, { useEffect } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaClipboardList,
  FaHardHat,
  FaTools,
  FaExclamationTriangle,
  FaUsers,
  FaStar,
  FaProjectDiagram,
  FaSignOutAlt,
} from "react-icons/fa";
import './Vndrhome.css'
import api from '../../api';

function Vndrhome() {
  const LoginId = localStorage.getItem("VLoginId");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="vendor-dashboard">
      {/* Background Shapes & Vignette */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <div className="page-wrapper">
        {/* ===== HEADER ===== */}
        <div className="dashboard-header">
          <h2>
            <FaHardHat className="me-2 text-warning" />
            Vendor Dashboard
          </h2>
          <Button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </div>

        <Container className="mt-4">
          <Row className="g-4">
            <DashboardCard
              icon={<FaBoxOpen />}
              title="Add Products"
              desc="Add new construction materials or tools to your catalog."
              link="/addprdpage"
            />

            <DashboardCard
              icon={<FaClipboardList />}
              title="Manage Products"
              desc="Check or update your product catalog."
              link="/viewprdt"
            />

            <DashboardCard
              icon={<FaTools />}
              title="Update Status"
              desc="Update the status of your products."
              link="/VendorUpdateStatus"
            />

            <DashboardCard
              icon={<FaClipboardList />}
              title="View Requests"
              desc="Check material requests from users or admin."
              link="/viewrequests"
            />

            <DashboardCard
              icon={<FaStar />}
              title="View Feedback"
              desc="See feedback given by users for your services."
              link="/VendorViewFeedback"
            />
          </Row>
        </Container>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, desc, link }) {
  return (
    <Col md={4}>
      <Card className="dashboard-card">
        <Card.Body className="text-center">
          <div className="card-icon">{icon}</div>
          <h5>{title}</h5>
          <p>{desc}</p>
          <Link to={link} className="dashboard-btn">
            Open
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Vndrhome;
