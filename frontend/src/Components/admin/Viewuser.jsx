import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";

function Viewuser() {
  return (
    <div>
      <Navpage />

      {/* 🔙 HEADER WITH BACK BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/homepage">
          <Button variant="secondary">⬅ Back</Button>
        </Link>

        <h3 className="fw-bold">USER INFO</h3>

        <Link to="/workerregistration">
          <Button variant="primary">+ ADD</Button>
        </Link>
      </div>

      {/* 📋 TABLE */}
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Button variant="success" size="sm">
                Accept
              </Button>
            </td>
            <td>
              <Button variant="danger" size="sm">
                Reject
              </Button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <Button variant="success" size="sm">
                Accept
              </Button>
            </td>
            <td>
              <Button variant="danger" size="sm">
                Reject
              </Button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>Bird</td>
            <td>@twitter</td>
            <td>
              <Button variant="success" size="sm">
                Accept
              </Button>
            </td>
            <td>
              <Button variant="danger" size="sm">
                Reject
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Viewuser;
