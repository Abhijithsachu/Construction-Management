import React, { useEffect, useState } from "react";
import "./VendorUpdateStatus.css";
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
    <div className="orderstatus-page">
      {/* BACKGROUND EFFECTS */}
      <div className="order-bg one"></div>
      <div className="order-bg two"></div>
      <div className="order-bg three"></div>
      <div className="order-vignette"></div>

      <Container className="order-container">
        {/* BACK BUTTON */}
        <button
          className="order-back-btn"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>

        <h2 className="order-heading">Update Order Status</h2>

        <Row>
          <Col>
            <Card className="order-card">
              <Card.Body>
                <Table
                  responsive
                  hover
                  bordered
                  className="order-table text-center align-middle"
                >
                  <thead>
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
                              className="order-select"
                              value={statusMap[order._id] || order.status}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                            >
                              <option>Order Confirmed</option>
                              <option>Packed</option>
                              <option>Shipped</option>
                              <option>Out for Delivery</option>
                              <option>Delivered</option>
                            </Form.Select>
                          </td>

                          <td>
                            <Button
                              className="order-update-btn"
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
