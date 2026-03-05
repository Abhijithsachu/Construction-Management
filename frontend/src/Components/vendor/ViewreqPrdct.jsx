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

  // STATUS BADGE (Bootstrap Variants Only)
  const renderStatusBadge = (status) => {
    const badgeMap = {
      pending: "warning",
      Approved: "primary",
      Packed: "info",
      Shipped: "dark",     // Changed from primary → dark
      Delivered: "success",
      Rejected: "secondary",
    };

    return <Badge bg={badgeMap[status]}>{status}</Badge>;
  };

  // ACTION BUTTON (Bootstrap Variants Only)
  const renderActionButton = (req) => {
    const nextStatus = nextStatusMap[req.status];

    if (req.status === "Delivered" || req.status === "Rejected") {
      return <Badge bg="secondary">No Action</Badge>;
    }

    const buttonMap = {
      Approved: "primary",
      Packed: "info",
      Shipped: "dark",     // Changed here also
      Delivered: "success",
    };

    return (
      <Button
        variant={buttonMap[nextStatus]}
        size="sm"
        className="fw-bold shadow"
        onClick={() => updateStatus(req._id, nextStatus)}
      >
        ➜ {nextStatus}
      </Button>
    );
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background:
          "radial-gradient(circle at top, #1f2933, #0b0f14)",
      }}
    >
      <Container>

        <div className="d-flex justify-content-between align-items-center mb-4 bg-dark bg-opacity-50 p-3 rounded shadow-lg">
          <Button
            variant="outline-warning"
            onClick={() => navigate(-1)}
            className="fw-bold"
          >
            ⬅ Back
          </Button>

          <h4 className="mb-0 fw-bold text-white">
            📦 Booking Requests
          </h4>

          <Form.Select
            className="w-auto fw-bold bg-dark text-white border-secondary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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
            <Card className="bg-dark bg-opacity-50 text-light shadow-lg border-0 rounded-4">
              <Card.Body>
                <Table
                  responsive
                  hover
                  className="text-center align-middle mb-0 table-dark"
                >
                  <thead>
                    <tr>
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
                          <td>{renderStatusBadge(req.status)}</td>
                          <td>{renderActionButton(req)}</td>
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