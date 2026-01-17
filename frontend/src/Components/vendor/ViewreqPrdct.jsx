import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
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

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await api.put(
        `/viewproductbooking/updatestatus/${bookingId}`,
        { status: newStatus }
      );
      fetchRequests();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const filteredRequests =
    filterStatus === "All"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  const nextStatusMap = {
    pending: "Approved",
    Approved: "Packed",
    Packed: "Shipped",
    Shipped: "Delivered",
    Delivered: "Delivered",
    Rejected: "Rejected",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1f2933, #0b0f14)",
        paddingTop: "30px",
        paddingBottom: "40px",
      }}
    >
      <Container>
        {/* TOP BAR */}
        <div
          className="d-flex justify-content-between align-items-center mb-4"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            borderRadius: "16px",
            padding: "12px 18px",
            boxShadow: "0 10px 35px rgba(0,0,0,0.45)",
          }}
        >
          <Button
            variant="outline-light"
            className="fw-bold"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>

          <h4 className="mb-0 fw-bold text-white">
            📦 Booking Requests
          </h4>

          <Form.Select
            className="w-auto fw-bold bg-dark text-white border-0"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            }}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </div>

        <Row>
          <Col>
            <Card
              className="border-0"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                borderRadius: "20px",
                boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
              }}
            >
              <Card.Body>
                <Table
                  responsive
                  hover
                  className="text-center align-middle mb-0"
                  style={{ color: "#e5e7eb" }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "rgba(255,255,255,0.12)",
                      }}
                    >
                      <th>#</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Address</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((req, index) => (
                        <tr
                          key={req._id}
                          style={{
                            background:
                              "rgba(0,0,0,0.35)",
                          }}
                        >
                          <td>{index + 1}</td>

                          <td>
                            <strong>{req.userId?.name}</strong>
                            <br />
                            <small
                              style={{ color: "#9ca3af" }}
                            >
                              {req.userId?.email}
                            </small>
                          </td>

                          <td>
                            {req.productId?.productname}
                          </td>
                          <td>
                            {req.productId?.Description}
                          </td>
                          <td>{req.quantity}</td>
                          <td>{req.address}</td>
                          <td>₹ {req.totalamount}</td>

                          <td>
                            <Badge
                              bg={
                                req.status === "Delivered"
                                  ? "success"
                                  : req.status === "Rejected"
                                  ? "danger"
                                  : req.status === "warning" ||
                                    req.status === "pending"
                                  ? "warning"
                                  : "info"
                              }
                              style={{
                                fontSize: "0.85rem",
                                padding: "6px 12px",
                                borderRadius: "20px",
                              }}
                            >
                              {req.status}
                            </Badge>
                          </td>

                          <td>
                            {req.status !== "Delivered" &&
                            req.status !== "Rejected" ? (
                              <Button
                                variant="outline-light"
                                size="sm"
                                style={{
                                  borderRadius: "20px",
                                  padding: "6px 14px",
                                  fontWeight: "bold",
                                  boxShadow:
                                    "0 4px 14px rgba(0,0,0,0.4)",
                                }}
                                onClick={() =>
                                  updateStatus(
                                    req._id,
                                    nextStatusMap[
                                      req.status
                                    ]
                                  )
                                }
                              >
                                ➜ {nextStatusMap[req.status]}
                              </Button>
                            ) : (
                              <Badge bg="secondary">
                                No Action
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          style={{ color: "#9ca3af" }}
                        >
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
