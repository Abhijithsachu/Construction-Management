import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";

function Verifyvendor() {
  return (
    <div>
      <Navpage />

      {/* 🔙 BACK BUTTON + CENTER HEADING */}
      <div className="position-relative mb-3">
        {/* Back Button - Left */}
        <Link to="/homepage" className="position-absolute start-0">
          <Button variant="secondary">⬅ Back</Button>
        </Link>

        {/* Center Heading */}
        <h3 className="fw-bold text-center">VENDOR INFO</h3>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Accept / Reject</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Button className="btn-success me-2">Accept</Button>
              <Button className="btn-danger">Reject</Button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <Button className="btn-success me-2">Accept</Button>
              <Button className="btn-danger">Reject</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Verifyvendor;
