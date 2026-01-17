import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaClipboardList,
  FaHardHat,
  FaExclamationTriangle,
  FaUsers,
  FaStar,
  FaProjectDiagram,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import "./Userhome.css";
import api from "../../api";

function Userhome() {
  const [user, setUser] = useState('');
  const LoginId = localStorage.getItem("ULoginId");
  console.log(LoginId);
  
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await api.get(`/user/details/${LoginId}`);
      console.log(res);
      
      localStorage.setItem("userId", res.data.user._id);
      setUser(res.data.user); // Save user details in state

    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
console.log(user);

  return (
    <div className="user-dashboard">
      {/* Premium Background Shapes */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <div className="page-wrapper">
        {/* ===== HEADER ===== */}
        <div className="dashboard-header">
          <h2>
            <FaHardHat className="me-2 text-warning" />
             Welcome {user.name}
          </h2>
          <Button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </div>

        {/* ===== DASHBOARD CARDS ===== */}
        <Container className="mt-4">
          <Row className="g-4">

            <DashboardCard
              icon={<FaBoxOpen />}
              title="View Products"
              desc="Browse construction materials."
              link="/userviewprdt"
            />

            <DashboardCard
              icon={<FaClipboardList />}
              title="Requested Products"
              desc="Track material requests."
              link="/userreqprdct"
            />

            <DashboardCard
              icon={<FaHardHat />}
              title="Hire Workers"
              desc="Select skilled workers."
              link="/userreqworker"
            />

            <DashboardCard
              icon={<FaUsers />}
              title="Worker Responses"
              desc="View replies & updates."
              link="/viewwrkrs"
            />

            <DashboardCard
              icon={<FaProjectDiagram />}
              title="Project Management"
              desc="Manage project details."
              link="/projectdetails"
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
        <Card.Body>
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

export default Userhome;
