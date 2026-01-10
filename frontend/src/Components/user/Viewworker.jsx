import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Viewworkers() {
  const [workers, setWorkers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [complaintText, setComplaintText] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAcceptedWorkers();
  }, []);

  const fetchAcceptedWorkers = async () => {
    try {
      const res = await api.get("/worker/verifiedworker");
      setWorkers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openComplaintModal = (worker) => {
    setSelectedWorker(worker);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setComplaintText("");
    setSelectedWorker(null);
  };

  const submitComplaint = async () => {
  if (!complaintText.trim()) {
    alert("Please enter complaint details");
    return;
  }

  try {
    await api.post(`/complaint/worker/${selectedWorker._id}`,
      {
        userId,
        issueDescription: complaintText,
      }
    );

    alert("Complaint submitted successfully");
    closeModal();
  } catch (error) {
    console.error(error);
    alert("Failed to submit complaint");
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
      {/* BACK BUTTON */}
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
        <h2 className="text-center fw-bold text-white mb-4">
          ✅ Accepted Workers
        </h2>

        <div className="row g-4">
          {workers.length === 0 ? (
            <p className="text-center text-light">
              No accepted workers found
            </p>
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
                    <h5 className="card-title fw-semibold">
                      {item.name}
                    </h5>

                    <p className="card-text text-muted small">
                      {item.jobRole}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success fs-6">
                        Accepted
                      </span>
                      <span className="badge bg-secondary">
                        📍 {item.location}
                      </span>
                    </div>

                    <p className="small mb-1">
                      📞 {item.phoneNo}
                    </p>

                    <p className="small text-muted mb-3">
                      ✉️ {item.email}
                    </p>

                    <Button
                      variant="outline-danger"
                      className="mt-auto w-100"
                      onClick={() => openComplaintModal(item)}
                    >
                      🚨 Raise Complaint
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* COMPLAINT MODAL */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Raise Complaint</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="fw-semibold mb-2">
            Worker: {selectedWorker?.name}
          </p>

          <Form>
            <Form.Group>
              <Form.Label>Complaint Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe your issue clearly..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={submitComplaint}>
            Submit Complaint
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Viewworkers;
