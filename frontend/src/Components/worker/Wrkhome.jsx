import React, { useEffect } from 'react'
import { Card, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import './Wrkhome.css'
import api from '../../api';

function Wrkhome() {
  const LoginId = localStorage.getItem("LoginId");
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

   // Fetch worker id
 const getWorker = async () => {
    try {
      const res = await api.get(`/worker/details/${LoginId}`);
      console.log(res);
      
      localStorage.setItem('workerId', res.data.user._id);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  useEffect(()=>{
    getWorker()
  },[])
  return (
    <div className="container mt-4 user-home">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold fade-in">
          Welcome to Construction Manager
        </h2>

        <div className="d-flex gap-2">
          <Link to="/profile">
            <Button className="profile-btn">
              My Profile
            </Button>
          </Link>

          {/* 🔴 LOGOUT */}
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="row mb-4">
        {[
          { title: "Active Projects", value: 5, color: "primary" },
          { title: "Pending Requests", value: 3, color: "warning" },
          { title: "Completed Work", value: 12, color: "success" },
          { title: "Notifications", value: 4, color: "danger" }
        ].map((item, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <Card className="dashboard-card scale-hover text-center">
              <h5>{item.title}</h5>
              <h2 className={`text-${item.color}`}>{item.value}</h2>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h4 className="section-title">Quick Actions</h4>
      <div className="row mb-4">
        {[
          { title: "View All Projects", link: "/projects" },
          { title: "Request Worker", link: "/addworker" },
          { title: "Report Site Issue", link: "/issues" }
        ].map((action, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <Link to={action.link} className="no-link-style">
              <Card className="quick-card hover-glow text-center">
                {action.title}
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h4 className="section-title mb-3">Recent Activity</h4>
      <Table striped bordered hover className="activity-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Activity</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Requested 2 electricians for Site A</td>
            <td>26 Nov 2025</td>
            <td className="pending">Pending</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Submitted safety issue report</td>
            <td>24 Nov 2025</td>
            <td className="resolved">Resolved</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Viewed progress report for Project Delta</td>
            <td>20 Nov 2025</td>
            <td className="viewed">Viewed</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Wrkhome;
