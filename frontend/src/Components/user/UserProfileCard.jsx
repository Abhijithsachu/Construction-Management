import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function UserProfileCard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const LoginId = localStorage.getItem("LoginId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/details/${LoginId}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [LoginId]);

  if (!user)
    return <p className="text-center mt-5 text-dark">Loading user data...</p>;

  return (
    <Container className="my-5">
      <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
        ⬅ Back
      </Button>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header className="text-center bg-primary text-white">
              <img
                src={user.photo ? `http://localhost:8000/${user.photo}` : "/default-avatar.png"}
                alt={user.name}
                className="rounded-circle mb-2"
                style={{ width: "100px", height: "100px", objectFit: "cover", border: "3px solid white" }}
              />
              <h3 className="mb-0">{user.name}</h3>
              <small>{user.role || "User"}</small>
            </Card.Header>

            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> {user.phoneNo || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Address:</strong> {user.address || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Username:</strong> {user.username || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Registration Date:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>

            <Card.Footer className="text-center">
              <Button variant="primary" onClick={() => navigate("/editprofile")}>
                Edit Profile
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfileCard;
