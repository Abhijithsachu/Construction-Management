import React, { useEffect, useState } from "react";
import api from "../../api"; // Make sure your API base URL is correct
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";

function Projectdetails() {
  const [projects, setProjects] = useState([]);

  // Form state
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await api.get("/project"); // backend GET endpoint
      console.log("Fetched projects:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/project/add", {
        projectName,
        location,
        description,
        startDate,
        endDate,
      });
      alert(res.data.message || "Project added successfully");
      fetchProjects();

      // Reset form
      setProjectName("");
      setLocation("");
      setDescription("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error("Error adding project:", err.response?.data || err.message);
      alert("Failed to add project");
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
      <div className="container">
        <h2 className="text-center fw-bold text-white mb-4">
          🏗️ Project Management
        </h2>

        {/* ADD PROJECT FORM */}
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
                    placeholder="Project Description"
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
                <div className="col-md-6 mb-3">
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" variant="success" className="fw-bold">
                ➕ Add Project
              </Button>
            </Form>
          </div>
        </div>

        {/* VIEW PROJECTS */}
        <div className="row g-4">
          {projects.length === 0 ? (
            <p className="text-center text-light">No projects found</p>
          ) : (
            projects.map((project) => (
              <div className="col-lg-6" key={project._id}>
                <div className="card shadow-lg border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold">{project.projectName}</h5>

                    <Badge bg="info" className="me-2">
                      {project.location}
                    </Badge>
                    <Badge bg="secondary">
                      {project.status || "In Progress"}
                    </Badge>

                    <p className="text-muted mt-2">{project.description}</p>

                    <small>
                      Start: {project.startDate} | End: {project.endDate}
                    </small>

                    {/* PROGRESS BAR */}
                    <div className="mt-3">
                      <ProgressBar
                        now={project.progress || 0}
                        label={`${project.progress || 0}%`}
                        animated
                        variant={
                          project.progress < 40
                            ? "danger"
                            : project.progress < 70
                            ? "warning"
                            : "success"
                        }
                      />
                    </div>

                    {/* ASSIGNED WORKERS */}
                    {project.workers?.length > 0 && (
                      <>
                        <hr />
                        <h6 className="fw-bold">👷 Workers</h6>
                        <ul className="list-group list-group-flush">
                          {project.workers.map((w) => (
                            <li key={w._id} className="list-group-item">
                              {w.name} – {w.jobRole}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* MATERIALS USED */}
                    {project.materials?.length > 0 && (
                      <>
                        <hr />
                        <h6 className="fw-bold">🧱 Materials</h6>
                        <ul className="list-group list-group-flush">
                          {project.materials.map((m) => (
                            <li key={m._id} className="list-group-item">
                              {m.productName} – Qty: {m.quantity}
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
    </div>
  );
}

export default Projectdetails;
