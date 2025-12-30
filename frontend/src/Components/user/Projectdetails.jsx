import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

function Projectdetails() {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);

  // form
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const userId = localStorage.getItem("userId");

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = async () => {
    try {
      const res = await api.get(`/projects/userproject/${userId}`);
      setProjects(res.data.data);
      console.log(res,"jjjj");
      
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- FETCH VERIFIED WORKERS ---------------- */
  const fetchAcceptedWorkers = async () => {
    try {
      const res = await api.get("/worker/verifiedworker");
      setWorkers(res.data);
      console.log("Verified workers:", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchAcceptedWorkers();
  }, []);

  /* ---------------- ADD PROJECT ---------------- */
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
     let re= await api.post("/project/add", {
        projectName,
        location,
        description,
        startDate,
        workers: selectedWorker,
        userId
      });
      console.log(re);
      
      alert("Project added successfully");
      fetchProjects();

      // reset
      setProjectName("");
      setLocation("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setSelectedWorker("");
    } catch (err) {
      console.error(err);
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

                <div className="col-md-6 mb-3">
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>

                {/* -------- WORKER DROPDOWN -------- */}
                <div className="col-md-12 mb-3">
                  <Form.Select
                    value={selectedWorker}
                    onChange={(e) => setSelectedWorker(e.target.value)}
                  >
                    <option value="">Select Verified Worker</option>
                    {workers.map((worker) => (
                      <option key={worker._id} value={worker._id}>
                        {worker.name} – {worker.jobrole}
                      </option>
                    ))}
                  </Form.Select>
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
                <div className="card shadow-lg border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-bold">{project.projectName}</h5>

                    <Badge bg="info" className="me-2">
                      {project.location}
                    </Badge>

                    <p className="text-muted mt-2">
                      {project.description}
                    </p>

                    <small>
                      Start: {project.startDate} | End: {project.endDate}
                    </small>

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
    </div>
  );
}

export default Projectdetails;
