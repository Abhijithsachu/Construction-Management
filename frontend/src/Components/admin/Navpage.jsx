import React from 'react'

import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
function Navpage() {
  return (
    <div>
      {/* TOP NAVIGATION */}
      <Nav justify variant="tabs" defaultActiveKey="/homepage">
        <Nav.Item>
          <Nav.Link as={Link} to="/homepage">Home</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/adminviewuser">User</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/adminverifyvendor">Vendor</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/adminviewworker">Worker</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default Navpage
