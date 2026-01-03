import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Viewuser() {
  const [users, setUsers] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await api.get("/user/viewUser");
      setUsers(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="viewuser-page bg-dark min-vh-100 text-white">
      <Navpage />

      <Container className="mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <Link to="/homepage">
            <Button variant="secondary">⬅ Back</Button>
          </Link>
          <h3 className="fw-bold text-center w-100 mb-0">USER INFO</h3>
          <div></div>
        </div>

        <Table striped bordered hover responsive className="table-dark align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email / Username</th>
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
                <td colSpan="4" className="text-center text-warning">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Viewuser;
