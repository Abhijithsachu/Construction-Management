import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navpage() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // redirect to login/home page
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand> AdminPanel </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/adminviewuser">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/adminverifyvendor">
              Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="/adminviewworker">
              Workers
            </Nav.Link>
            <Nav.Link as={Link} to="/viewprojects">
              Projects
            </Nav.Link>
          </Nav>

          {/* Logout button on the right */}
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navpage;
