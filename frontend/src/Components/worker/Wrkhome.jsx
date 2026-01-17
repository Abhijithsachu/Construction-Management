import React, { useEffect, useState } from 'react'
import { Card, Button, Table, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaHardHat, FaSignOutAlt, FaProjectDiagram, FaClipboardList } from "react-icons/fa";
import './Wrkhome.css'
import api from '../../api';

function Wrkhome() {
  const LoginId = localStorage.getItem("WLoginId");
  const navigate = useNavigate();

  const [worker, setWorker] = useState('');
  const [activeProjects, setActiveProjects] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [completedWork, setCompletedWork] = useState(0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getWorker = async () => {
    try {
      const res = await api.get(`/worker/details/${LoginId}`);
      localStorage.setItem('workerId', res.data.user._id);
      setWorker(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const getDashboardCounts = async () => {
    try {
      const workerId = localStorage.getItem("workerId");

      const res = await api.get(`/worker/workercount/${workerId}`);
      console.log(res);
      
      setActiveProjects(res.data.activeProjects);
      setPendingRequests(res.data.pendingRequests);
      setCompletedWork(res.data.completedWork);
    } catch (error) {
      console.error("Failed to fetch dashboard counts:", error);
    }
  };

  useEffect(() => {
    getWorker();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("workerId")) {
      getDashboardCounts();
    }
  }, [worker]);

  return (
    <div className="worker-dashboard">
      {/* Background shapes & vignette */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <Container className="page-wrapper pt-4">
        {/* ===== HEADER ===== */}
        <div className="dashboard-header mb-4">
          <h2>
            <FaHardHat className="me-2 text-warning" />
            {worker.name} Dashboard
          </h2>
          <Button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </div>

        {/* ===== DASHBOARD CARDS ===== */}
        <Row className="g-4 mb-4">
          <DashboardCard title="Active Projects" value={activeProjects} icon={<FaProjectDiagram />} />
          <DashboardCard title="Pending Requests" value={pendingRequests} icon={<FaClipboardList />} />
          <DashboardCard title="Completed Work" value={completedWork} icon={<FaHardHat />} />
        </Row>

        {/* ===== QUICK ACTIONS ===== */}
        <h4 className="section-title">Quick Actions</h4>
        <Row className="g-4 mb-4">
          {[
            { title: "View All Projects", link: "/projects" },
            { title: "Request Worker", link: "/addworker" },
            { title: "View Complaint", link: "/viewwrkercomplaint" }
          ].map((action, index) => (
            <Col md={4} key={index}>
              <Link to={action.link} className="no-link-style">
                <Card className="quick-card hover-glow text-center">{action.title}</Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Col md={3}>
      <Card className="dashboard-card text-center">
        <div className="card-icon">{icon}</div>
        <h5>{title}</h5>
        <h2 className="text-warning">{value}</h2>
      </Card>
    </Col>
  );
}

export default Wrkhome;
