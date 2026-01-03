import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function ViewWorkers() {
  const [workers, setWorkers] = useState([]);
  const [projects, setProjects] = useState([]); // Only project names
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const navigate = useNavigate();

  const id = localStorage.getItem("userId");


  useEffect(() => {
    fetchWorkers();
    fetchProjects();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/worker/verifiedworker");
      setWorkers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get(`/project/userproject/${id}`); // API to get user projects
      console.log(res);
      
      setProjects(res.data.data);
      console.log(res,"hh");
      
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (worker) => {
    setSelectedWorker(worker);
    setSelectedProjectId("");
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedWorker(null);
    setSelectedProjectId("");
    setShowModal(false);
  };

  const handleRequestWorker = async () => {
    if (!selectedProjectId) {
      alert("Please select a project");
      return;
    }

    try {
      const res = await api.post("/project/request", {
        workerId: selectedWorker._id,
        projectId: selectedProjectId,
      });
      alert(res.data.message || "Worker requested successfully");
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Failed to request worker");
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
        position: "relative",
      }}
    >
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          fontWeight: "bold",
        }}
      >
        ⬅ Back
      </Button>

      <div className="container">
        <h2 className="text-center fw-bold text-white mb-4">👷 Available Workers</h2>

        <div className="row g-4">
          {workers.length === 0 ? (
            <p className="text-center text-light">No workers found</p>
          ) : (
            workers.map((item) => (
              <div className="col-lg-4 col-md-6" key={item._id}>
                <div className="card h-100 shadow-lg border-0">
                  <img
                    src={`http://localhost:8000/${item.photo}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">{item.name}</h5>
                    <p className="card-text text-muted small">{item.jobrole}</p>
                    <div className="mb-2">
                      <span className="badge bg-dark me-2">{item.qualification}</span>
                    </div>
                    <p className="small mb-1">📞 {item.phoneNo}</p>
                    <p className="small text-muted">✉️ {item.email}</p>
                    <Button
                      variant="warning"
                      className="mt-auto w-100 fw-bold"
                      onClick={() => openModal(item)}
                    >
                      🚀 Request Worker
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Project Selection */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Worker: {selectedWorker?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Select Project</Form.Label>
            <Form.Select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
            >
              <option value="">-- Choose a project --</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.projectname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRequestWorker}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewWorkers;
