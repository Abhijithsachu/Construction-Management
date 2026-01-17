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
import Navpage from "./Navpage";

function AdminViewComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaint/admin");
      setComplaints(res.data.complaints || res.data || []);
      console.log(res);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.issueDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.workerId?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" && !c.reply) ||
      (filterStatus === "replied" && c.reply);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-complaints-page bg-dark min-vh-100 text-white">
      <Navpage />

      <Container className="mt-5 pt-5 ">
        {/* 🔙 Back & Title */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ⬅ Back
          </Button>
          <h3 className="fw-bold text-center w-100 mb-0">
            ADMIN COMPLAINT MANAGEMENT
          </h3>
          <div></div>
        </div>

        {/* 🔎 Search & Filter */}
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search complaints, users, or workers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col md={4}>
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
            </Form.Select>
          </Col>

          <Col md={2} className="d-flex align-items-center">
            <Badge bg="light" text="dark" className="w-100 text-center">
              {filteredComplaints.length} Records
            </Badge>
          </Col>
        </Row>

        {/* 📊 Table */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-warning text-center">No complaints found.</p>
        ) : (
          <Table striped bordered hover responsive className="table-dark align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>User</th>
                <th>Worker</th>
                <th>Complaint & Reply</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.userId?.name || "N/A"}</td>
                  <td>{item.workerId?.name || "N/A"}</td>

                  <td>
                    <div className="p-2 border rounded bg-light text-dark">
                      <strong>Complaint:</strong>
                      <p className="mb-1">{item.issueDescription}</p>

                      {item.reply && (
                        <>
                          <hr className="my-1" />
                          <strong className="text-success">Reply:</strong>
                          <p className="mb-0 text-success">{item.reply}</p>
                        </>
                      )}
                    </div>
                  </td>

                  <td>
                    {item.reply ? (
                      <Badge bg="success">Replied</Badge>
                    ) : (
                      <Badge bg="warning" text="dark">
                        Pending
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}

export default AdminViewComplaints;
