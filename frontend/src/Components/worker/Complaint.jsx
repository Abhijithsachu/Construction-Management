import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Container,
  Table,
  Button,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";

function Complaint() {
  const workerId = localStorage.getItem("workerId");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get(`/complaint/workers/${workerId}`);
        console.log(res);
        
        setComplaints(res.data.complaints || res.data || []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

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
      await api.put(`/complaint/reply/${selectedComplaint._id}`, {
        reply,
      });

      alert("Reply sent successfully");

      handleCloseModal();

      // Refresh complaints
      const res = await api.get(`/complaint/workers/${workerId}`);
      console.log(res);
      
      setComplaints(res.data.complaints || res.data || []);
    } catch (error) {
      console.error("Reply error:", error);
      alert("Failed to send reply");
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-3">My Complaints</h4>

      {loading ? (
        <Spinner animation="border" />
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Complaint</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.userId?.name || "N/A"}</td>
                <td>{item.issueDescription}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleOpenModal(item)}
                  >
                    Reply
                  </Button>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
          <Button variant="success" onClick={handleSubmitReply}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Complaint;
