import React, { useEffect, useState } from "react";
import { Button, Badge, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Viewworker() {
  const [workers, setWorkers] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await api.get("/worker/all");
      setWorkers(res.data.workerDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleAccept = async (loginId) => {
    await api.put(`/worker/updatestatus/${loginId}`, { verify: true });
    fetchDetails();
  };

  const handleReject = async (loginId) => {
    await api.put(`/worker/updatestatus/${loginId}`, { verify: false });
    fetchDetails();
  };

  return (
    <div className="viewworker-page bg-dark min-vh-100 text-white">
      <Navpage />

      <Container className="mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <Link to="/homepage">
            <Button variant="secondary">⬅ Back</Button>
          </Link>
          <h3 className="fw-bold text-center w-100 mb-0">WORKER INFO</h3>
          <div></div>
        </div>

        <Table striped bordered hover responsive className="table-dark align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job Role</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {workers.length > 0 ? (
              workers.map((worker, index) => {
                const verified = worker.commonkey?.verify;

                return (
                  <tr key={worker._id}>
                    <td>{index + 1}</td>
                    <td>{worker.name}</td>
                    <td>{worker.jobrole}</td>
                    <td>{worker.email}</td>
                    <td>{worker.phoneNo}</td>
                    <td>
                      <Badge
                        bg={
                          verified === true
                            ? "success"
                            : verified === false
                            ? "danger"
                            : "warning"
                        }
                        className={verified === null ? "text-dark" : ""}
                      >
                        {verified === true
                          ? "Approved"
                          : verified === false
                          ? "Rejected"
                          : "Pending"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAccept(worker.commonkey._id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(worker.commonkey._id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-warning">
                  No workers found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Viewworker;
