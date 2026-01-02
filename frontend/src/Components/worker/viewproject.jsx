import React, { useEffect, useState } from "react";
import api from "../../api";
import { Card, Badge, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewProject() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();
  const workerId = localStorage.getItem("workerId");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get(`/project/workerproject/${workerId}`);
      console.log(res);
      
      setProjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
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

  // ✅ Open popup ONLY for accepted projects
  const handleProjectClick = (project) => {
    if (project.status === "accepted") {
      setSelectedProject(project);
      setShowModal(true);
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
              <Card
                className="shadow-lg border-0 h-100"
                style={{
                  cursor:
                    project.status === "accepted" ? "pointer" : "default",
                }}
                onClick={() => handleProjectClick(project)}
              >
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

                  {project.status === "pending" ? (
                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(project._id);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(project._id);
                        }}
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

      {/* ✅ POPUP MODAL */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <>
              <p><strong>Name:</strong> {selectedProject.projectname}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Location:</strong> {selectedProject.location}</p>
              <p><strong>Status:</strong> {selectedProject.status}</p>
              
             <hr />

      {selectedProject.staff?.length > 0 ? (
        <>
          <p><strong>Staff Members:</strong></p>
          <ul>
            {selectedProject.staff.map((member, index) => (
              <li key={index}>
                👤 {member.name} — 📞 {member.phone}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No staff added</p>
      )}
    </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewProject;
