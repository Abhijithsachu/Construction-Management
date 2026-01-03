import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function Projectdetails() {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [projects, setProjects] = useState([]);

  // form states
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const userId = localStorage.getItem("userId");

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = async () => {
    try {
      const res = await api.get(`/project/userproject/${userId}`);
      setProjects(res.data.data);
      console.log("Projects:", res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ---------------- ADD PROJECT ---------------- */
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      let re = await api.post("/project/add", {
        projectName,
        location,
        description,
        startDate,
        userId,
      });
      console.log(re);

      alert("Project added successfully");
      fetchProjects();

      // reset form
      setProjectName("");
      setLocation("");
      setDescription("");
      setStartDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    }
  };

  /* ---------------- HANDLE PROJECT CLICK ---------------- */
  const handleProjectClick = (project) => {
    if (project.status === "accepted") {
      setSelectedProject(project);
      setShowModal(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      {/* BACK BUTTON */}
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        ⬅ Back
      </Button>

      <div className="container">
        <h2 className="text-center fw-bold text-white mb-4">
          🏗️ Project Management
        </h2>

        {/* -------- ADD PROJECT FORM -------- */}
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">➕ Add New Project</h5>

            <Form onSubmit={handleAddProject}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Control
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Form.Control
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="success">
                ➕ Add Project
              </Button>
            </Form>
          </div>
        </div>

        {/* -------- PROJECT LIST -------- */}
        <div className="row g-4">
          {projects.length === 0 ? (
            <p className="text-center text-light">No projects found</p>
          ) : (
            projects.map((project) => (
              <div className="col-lg-6" key={project._id}>
                <div
                  className="card shadow-lg border-0 h-100"
                  style={{
                    cursor: project.status === "accepted" ? "pointer" : "default",
                  }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="card-body">
                    <h5 className="fw-bold">{project.projectName}</h5>

                    <Badge bg="info" className="me-2">
                      {project.location}
                    </Badge>

                    <p className="text-muted mt-2">{project.description}</p>

                    <small>Start: {project.startDate}</small>

                    <div className="mt-3">
                      <ProgressBar
                        now={project.progress || 0}
                        label={`${project.progress || 0}%`}
                      />
                    </div>

                    {/* WORKERS */}
                    {project.workers?.length > 0 && (
                      <>
                        <hr />
                        <h6 className="fw-bold">👷 Assigned Workers</h6>
                        <ul className="list-group list-group-flush">
                          {project.workers.map((w) => (
                            <li key={w._id} className="list-group-item">
                              {w.name} – {w.jobrole}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ---------------- POPUP MODAL FOR ACCEPTED PROJECTS ---------------- */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>📋 Project Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedProject && (
            <>
              <p>
                <strong>Project:</strong> {selectedProject.projectName}
              </p>
              <p>
                <strong>Location:</strong> {selectedProject.location}
              </p>
              <p>
                <strong>Description:</strong> {selectedProject.description}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge bg="success">{selectedProject.status}</Badge>
              </p>

              <hr />

              {/* 👷 STAFF DETAILS */}
              <h6 className="fw-bold">👷 Staff Added</h6>
              {selectedProject.staff?.length > 0 ? (
                <ul className="list-group">
                  {selectedProject.staff.map((s, index) => (
                    <li key={index} className="list-group-item">
                      👤 {s.name} — 📞 {s.phone}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No staff added yet</p>
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

export default Projectdetails;
