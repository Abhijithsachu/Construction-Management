import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Viewuser() {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchDetails = async () => {
    try {
      const res = await api.get("/user/viewUser");
      console.log(res, "USER DATA");
      setUsers(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <Navpage />

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-3">
        <Link to="/homepage">
          <Button variant="secondary">⬅ Back</Button>
        </Link>

        <h3 className="fw-bold mb-0">USER INFO</h3>

        <Link to="/workerregistration">
          <Button variant="primary">+ ADD</Button>
        </Link>
      </div>

      {/* USER TABLE */}
      <div className="px-3">
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Phone No</th>

            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Viewuser;
