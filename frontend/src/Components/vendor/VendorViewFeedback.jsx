import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function VendorViewFeedback() {
  const vendorId = localStorage.getItem("vendorId");
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get(`/vendor/feedback/${vendorId}`);
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Failed to load feedback", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* BACK BUTTON */}
        <div className="mb-3">
          <Button
            variant="light"
            className="fw-bold"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>
        </div>

        <h2 className="text-center fw-bold text-primary mb-4">
          View Feedback
        </h2>

        <Row>
          <Col>
            <Card className="shadow border-0">
              <Card.Body>
                <Table
                  bordered
                  hover
                  responsive
                  className="align-middle text-center"
                >
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Given By</th>
                      <th>Role</th>
                      <th>Product / Service</th>
                      <th>Rating</th>
                      <th>Feedback</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((fb, index) => (
                        <tr key={fb._id}>
                          <td>{index + 1}</td>

                          <td>
                            <strong>
                              {fb.user?.name || fb.worker?.name}
                            </strong>
                            <br />
                            <small className="text-muted">
                              {fb.user?.email || fb.worker?.phone}
                            </small>
                          </td>

                          <td>
                            <Badge bg={fb.user ? "info" : "warning"}>
                              {fb.user ? "User" : "Worker"}
                            </Badge>
                          </td>

                          <td>{fb.product?.productName || "Service"}</td>

                          <td>
                            <Badge bg="success">⭐ {fb.rating} / 5</Badge>
                          </td>

                          <td style={{ maxWidth: "250px" }}>{fb.comment}</td>

                          <td>
                            {new Date(fb.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-muted">
                          No feedback available
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
    </div>
  );
}

export default VendorViewFeedback;
