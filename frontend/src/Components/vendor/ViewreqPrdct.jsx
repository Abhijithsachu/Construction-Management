import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function VendorViewRequests() {
  const vendorId = localStorage.getItem("vendorId");
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await api.get(
        `/viewproductbooking/viewbooking/${vendorId}`
      );
      setRequests(res.data.filterBookings);
    } catch (error) {
      console.error("Error fetching requests", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔥 STATUS UPDATE FUNCTION
  const updateStatus = async (bookingId, status) => {
    try {
      await api.put(`/viewproductbooking/updatestatus/${bookingId}`, {
        status: status,
      });
      fetchRequests();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  // ✅ FILTER LOGIC
  const filteredRequests =
    filterStatus === "All"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Button
            variant="light"
            className="fw-bold"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>

          {/* 🔽 FILTER */}
          <select
            className="form-select w-auto fw-bold"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <h2 className="text-center fw-bold text-primary mb-4">
          View Booking Requests
        </h2>

        <Row>
          <Col>
            <Card className="shadow border-0">
              <Card.Body>
                <Table
                  responsive
                  bordered
                  hover
                  className="text-center align-middle"
                >
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Address</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((req, index) => (
                        <tr key={req._id}>
                          <td>{index + 1}</td>

                          <td>
                            <strong>{req.userId?.name}</strong>
                            <br />
                            <small className="text-muted">
                              {req.userId?.email}
                            </small>
                          </td>

                          <td>{req.productId?.productname}</td>
                          <td>{req.productId?.Description}</td>
                          <td>{req.quantity}</td>
                          <td>{req.address}</td>
                          <td>₹ {req.totalamount}</td>

                          <td>
                            <Badge
                              bg={
                                req.status === "Approved"
                                  ? "success"
                                  : req.status === "Rejected"
                                  ? "danger"
                                  : "warning"
                              }
                            >
                              {req.status}
                            </Badge>
                          </td>

                          {/* ✅ ACTION BUTTONS */}
                          <td>
                            {req.status === "Pending" ? (
                              <>
                                <Button
                                  variant="success"
                                  size="sm"
                                  className="me-2"
                                  onClick={() =>
                                    updateStatus(req._id, "Approved")
                                  }
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() =>
                                    updateStatus(req._id, "Rejected")
                                  }
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Badge bg="secondary">Completed</Badge>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-muted">
                          No requests available
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

export default VendorViewRequests;
