import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Container,
  Table,
  Button,
  Spinner,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Badge,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Complaint() {
  const workerId = localStorage.getItem("workerId");
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reply, setReply] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | pending | replied

  const fetchComplaints = async () => {
    try {
      const res = await api.get(`/complaint/workers/${workerId}`);
      setComplaints(res.data.complaints || res.data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [workerId]);

  const handleOpenModal = (complaint) => {
    setSelectedComplaint(complaint);
    setReply(complaint.reply || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
    setReply("");
  };

  const handleSubmitReply = async () => {
    try {
      await api.put(`/complaint/status/${selectedComplaint._id}`, {
        reply,
      });

      alert("Reply sent successfully");
      handleCloseModal();
      fetchComplaints();
    } catch (error) {
      console.error("Reply error:", error);
      alert("Failed to send reply");
    }
  };

  // 🔍 Filter + Search Logic
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.issueDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" && !c.reply) ||
      (filterStatus === "replied" && c.reply);

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        {/* 🔙 Back Button */}
        <div className="mb-3">
          <Button variant="outline-light" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>

        <Card className="shadow-lg border-0 bg-white bg-opacity-90">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Worker Complaints</h4>
              <Badge bg="secondary">{filteredComplaints.length} Records</Badge>
            </div>

            {/* 🔎 Search + Filters */}
            <Row className="mb-3">
              <Col md={6} className="mb-2">
                <InputGroup>
                  <InputGroup.Text>🔍</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by user or complaint..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col md={4} className="mb-2">
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Complaints</option>
                  <option value="pending">Pending</option>
                  <option value="replied">Replied</option>
                </Form.Select>
              </Col>
            </Row>

            {/* 📊 Complaint Table */}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : filteredComplaints.length === 0 ? (
              <p className="text-muted">No complaints match your search.</p>
            ) : (
              <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Complaint & Reply</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.userId?.name || "N/A"}</td>

                      <td>
                        <div className="p-2 border rounded bg-white">
                          <strong>Complaint:</strong>
                          <p className="mb-1">{item.issueDescription}</p>

                          {item.reply && (
                            <>
                              <hr className="my-1" />
                              <strong className="text-success">Reply:</strong>
                              <p className="mb-0 text-success">
                                {item.reply}
                              </p>
                            </>
                          )}
                        </div>
                      </td>

                      <td>
                        {item.reply ? (
                          <Badge bg="success">Replied</Badge>
                        ) : (
                          <Badge bg="warning">Pending</Badge>
                        )}
                      </td>

                      <td>
                        <Button
                          size="sm"
                          variant={item.reply ? "secondary" : "primary"}
                          disabled={!!item.reply}
                          onClick={() => handleOpenModal(item)}
                        >
                          {item.reply ? "Replied" : "Reply"}
                        </Button>
                      </td>

                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* 🔔 Reply Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Reply to Complaint</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Reply</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter your reply..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleSubmitReply}
              disabled={!reply.trim()}
            >
              Send Reply
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Complaint;
