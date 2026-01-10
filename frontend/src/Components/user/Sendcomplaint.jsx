import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Sendcomplaint() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();a
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaint/user");
      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/complaint", {
        subject,
        category,
        description,
      });

      alert(res.data.message || "Complaint sent successfully");
      setSubject("");
      setCategory("");
      setDescription("");
      fetchComplaints();
    } catch (error) {
      console.error(error);
      alert("Failed to send complaint");
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
        position: "relative", // Required for absolute Back button
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
          📢 Complaints
        </h2>

        <div className="row g-4">

          {/* SEND COMPLAINT */}
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Send Complaint</h5>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter complaint subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select category</option>
                      <option>Product Issue</option>
                      <option>Worker Issue</option>
                      <option>Service Issue</option>
                      <option>Payment Issue</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Describe your issue"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="warning"
                      className="fw-bold"
                    >
                      🚀 Submit Complaint
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          {/* VIEW COMPLAINTS */}
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">My Complaints</h5>

                {complaints.length === 0 ? (
                  <p className="text-muted">No complaints submitted</p>
                ) : (
                  complaints.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded p-3 mb-3"
                    >
                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold mb-1">
                          {item.subject}
                        </h6>
                        <span
                          className={`badge ${
                            item.status === "Resolved"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {item.status || "Pending"}
                        </span>
                      </div>

                      <p className="small text-muted mb-1">
                        Category: {item.category}
                      </p>

                      <p className="small mb-1">
                        {item.description}
                      </p>

                      <p className="small text-muted mb-0">
                        📅 {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sendcomplaint;
