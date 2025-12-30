import React, { useEffect, useState } from "react";
import api from "../../api";
import { Card, Badge, ProgressBar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewProject() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const workerId = localStorage.getItem("workerId");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get(`/project/workerproject/${workerId}`);
      setProjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ ACCEPT PROJECT
  const handleAccept = async (projectId) => {
    try {
      await api.put(`/project/status/${projectId}`, {
        status: "accepted",
      });
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ REJECT PROJECT
  const handleReject = async (projectId) => {
    try {
      await api.put(`/project/status/${projectId}`, {
        status: "rejected",
      });
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        className="mb-4 fw-bold"
      >
        ⬅ Back
      </Button>

      <h2 className="text-center text-white fw-bold mb-4">
        🏗️ Project List
      </h2>

      <div className="row g-4">
        {projects.length === 0 ? (
          <p className="text-center text-white">No projects found</p>
        ) : (
          projects.map((project) => (
            <div className="col-md-6 col-lg-4" key={project._id}>
              <Card className="shadow-lg border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {project.projectname}
                  </Card.Title>

                  <div className="mb-2">
                    <Badge
                      bg={
                        project.status === "accepted"
                          ? "success"
                          : project.status === "rejected"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>

                  <Card.Text className="text-muted small">
                    {project.description}
                  </Card.Text>

                  <p className="small mb-2">
                    📍 {project.location}
                  </p>

                  {/* ACTION BUTTONS */}
                  {project.status === "pending" ? (
                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAccept(project._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleReject(project._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled
                      className="w-100"
                    >
                      Action Completed
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewProject;
