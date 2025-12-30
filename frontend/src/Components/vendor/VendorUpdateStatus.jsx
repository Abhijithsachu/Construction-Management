import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function VendorUpdateStatus() {
  const vendorId = localStorage.getItem("vendorId");
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/vendor/orders/${vendorId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleStatusChange = (orderId, value) => {
    setStatusMap({ ...statusMap, [orderId]: value });
  };

  const updateStatus = async (orderId) => {
    try {
      await api.put(`/vendor/update-status/${orderId}`, {
        status: statusMap[orderId],
      });
      fetchOrders();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* BACK BUTTON */}
        <div className="mb-3">
          <Button variant="light" className="fw-bold" onClick={() => navigate(-1)}>
            ⬅ Back
          </Button>
        </div>

        <h2 className="text-center fw-bold text-primary mb-4">
          Update Order Status
        </h2>

        <Row>
          <Col>
            <Card className="shadow border-0">
              <Card.Body>
                <Table bordered hover responsive className="align-middle text-center">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Current Status</th>
                      <th>Update Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>

                          <td>
                            <strong>{order.user?.name}</strong>
                            <br />
                            <small className="text-muted">
                              {order.user?.email}
                            </small>
                          </td>

                          <td>{order.product?.productName}</td>

                          <td>
                            <Badge
                              bg={
                                order.status === "Delivered"
                                  ? "success"
                                  : order.status === "Shipped"
                                  ? "info"
                                  : order.status === "Out for Delivery"
                                  ? "warning"
                                  : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>

                          <td>
                            <Form.Select
                              value={statusMap[order._id] || order.status}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                            >
                              <option value="Order Confirmed">Order Confirmed</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </Form.Select>
                          </td>

                          <td>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => updateStatus(order._id)}
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-muted">
                          No orders found
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

export default VendorUpdateStatus;
