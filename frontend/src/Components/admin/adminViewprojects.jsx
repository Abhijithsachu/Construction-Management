import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Navpage from "./Navpage";
import { Container, Card, Row, Col, Badge, Button } from "react-bootstrap";

function AdminViewprojects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const res = await api.get("/project/adminviewproject");
      setProjects(res.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // Determine badge color for status
  const getStatusColor = (status, workerAssigned) => {
    if (!workerAssigned) return "danger"; // No worker assigned → Red
    switch (status.toLowerCase()) {
      case "accepted":
        return "success"; // Green
      case "pending":
        return "warning"; // Yellow
      case "rejected":
        return "danger"; // Red
      default:
        return "secondary"; // Grey fallback
    }
  };

  return (
    <div className="admin-projects-page min-vh-100 bg-dark text-light">
      {/* Navbar */}
      <Navpage />

      <Container className="mt-5 pt-5">
        {/* Back Button & Title */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
          <h3 className="fw-bold text-white text-center mb-2 w-100">Projects</h3>
          <div></div>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <p className="text-light">No projects found</p>
        ) : (
          <Row className="g-4">
            {projects.map((project) => (
              <Col md={6} lg={4} key={project._id}>
                <Card className="h-100 shadow-sm hover-shadow">
                  <Card.Body>
                    <Card.Title>{project.projectname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      By: {project.userid.name} 
                      | Phone: {project.userid.phoneNo} 
                      | Email: {project.userid.email}
                    </Card.Subtitle>

                    <Card.Text>
                      <strong>Description:</strong> {project.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Location:</strong> {project.location}
                    </Card.Text>

                    {/* Status Badge */}
                    <Badge
                      bg={getStatusColor(project.status, project.workerID)}
                      className={project.status.toLowerCase() === "pending" ? "text-dark" : ""}
                    >
                      {project.workerID ? project.status : "No Worker Assigned"}
                    </Badge>

                    {/* Worker Info */}
                    {project.workerID ? (
                      <div className="mt-3">
                        <p className="fw-semibold text-success mb-1">Assigned Worker</p>
                        <p className="mb-1"><strong>Name:</strong> {project.workerID.name}</p>
                        <p className="mb-1"><strong>Contact:</strong> {project.workerID.phoneNo}</p>
                        <p className="mb-0"><strong>Role:</strong> {project.workerID.jobrole}</p>
                      </div>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default AdminViewprojects;
