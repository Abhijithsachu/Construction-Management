import React, { useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Sendfeedback() {
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/feedback", {
        subject,
        rating,
        message,
      });

      alert(res.data.message || "Feedback sent successfully");
      setSubject("");
      setRating("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send feedback");
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
          ⭐ Send Feedback
        </h2>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-lg border-0">
              <div className="card-body">

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>Feedback Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter feedback subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    >
                      <option value="">Select rating</option>
                      <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4">⭐⭐⭐⭐ Very Good</option>
                      <option value="3">⭐⭐⭐ Good</option>
                      <option value="2">⭐⭐ Needs Improvement</option>
                      <option value="1">⭐ Poor</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Feedback Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Write your feedback here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="warning"
                      size="lg"
                      className="fw-bold"
                    >
                      🚀 Submit Feedback
                    </Button>
                  </div>

                </Form>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sendfeedback;
