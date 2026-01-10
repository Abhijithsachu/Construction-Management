import React, { useEffect, useState } from "react";
import "./VendorViewFeedback.css";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function VendorViewComplaint() {
  const vendorId = localStorage.getItem("vendorId");

  const [feedbacks, setFeedbacks] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyText, setReplyText] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH COMPLAINTS ================= */
  const fetchFeedbacks = async () => {
    try {
      const res = await api.get(`/complaint/vendor/${vendorId}`);
      setFeedbacks(res.data.complaints);
    } catch (error) {
      console.error("Failed to load complaints", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  /* ================= SEND REPLY ================= */
  const handleReplySubmit = async () => {
    if (!selectedComplaint || !replyText.trim()) return;

    try {
      await api.put(`/complaint/status/${selectedComplaint._id}`, {
        reply: replyText,
      });

      setReplyText("");
      setSelectedComplaint(null);
      setShowReply(false);

      fetchFeedbacks(); // refresh table
    } catch (error) {
      console.error("Reply failed", error);
    }
  };

  return (
    <div className="vndrpage">
      {/* BACKGROUND EFFECTS */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <Container className="vndr-container">
        {/* BACK BUTTON */}
        <div className="mb-4">
          <Button
            variant="outline-warning"
            className="fw-bold"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>
        </div>

        <h2 className="vndrheading">Vendor Complaints</h2>

        <Row>
          <Col>
            <Card className="vndr-card">
              <Card.Body>
                <Table
                  responsive
                  hover
                  bordered
                  className="vndr-table text-center align-middle"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Given By</th>
                      <th>Role</th>
                      <th>Product</th>
                      <th>Title</th>
                      <th>Issue</th>
                      <th>Complaint</th>
                      <th>Date</th>
                      <th>Reply</th>
                    </tr>
                  </thead>

                  <tbody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((fb, index) => (
                        <tr key={fb._id}>
                          <td>{index + 1}</td>

                          <td>
                            <strong>
                              {fb.userId?.name || fb.worker?.name}
                            </strong>
                            <br />
                            <small className="text-muted">
                              {fb.userId?.email || fb.worker?.phone}
                            </small>
                          </td>

                          <td>
                            <Badge bg={fb.userId ? "info" : "warning"}>
                              {fb.userId ? "User" : "Worker"}
                            </Badge>
                          </td>

                          <td>{fb.productId?.productname || "Service"}</td>

                          <td>{fb.issueTitle}</td>

                          <td>{fb.issueType}</td>

                          <td className="complaint-text">
                            {fb.issueDescription}
                          </td>

                          <td>
                            {new Date(fb.createdAt).toLocaleDateString()}
                          </td>

                          {/* ===== REPLY COLUMN ===== */}
                          <td>
                            {fb.reply ? (
                              <div className="reply-text">
                                <strong>Reply:</strong>
                                <br />
                                {fb.reply}
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                  setSelectedComplaint(fb);
                                  setShowReply(true);
                                }}
                              >
                                Reply
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-muted text-center">
                          No complaint available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ================= REPLY MODAL ================= */}
      <Modal show={showReply} onHide={() => setShowReply(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Complaint</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReply(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleReplySubmit}
            disabled={!replyText.trim()}
          >
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendorViewComplaint;
