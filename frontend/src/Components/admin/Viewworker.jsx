import React, { useEffect, useState } from "react";
import { Button, Badge, Container, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Viewworker() {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState("");

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
              <th>Proof</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {workers.length > 0 ? (
              workers.map((worker, index) => {
                const verified = worker.commonkey?.verify;
                const proof = worker.proof;

                return (
                  <tr key={worker._id}>
                    <td>{index + 1}</td>
                    <td>{worker.name}</td>

                    {/* JOB ROLE LINE BY LINE */}
                    <td>
                      {Array.isArray(worker.jobrole) ? (
                        worker.jobrole.map((role, i) => (
                          <div key={i}>{role}</div>
                        ))
                      ) : typeof worker.jobrole === "string" ? (
                        worker.jobrole
                          .split(/(?=[A-Z])/)
                          .map((role, i) => (
                            <div key={i}>{role}</div>
                          ))
                      ) : (
                        <span className="text-muted">No Role</span>
                      )}
                    </td>

                    <td>{worker.email}</td>
                    <td>{worker.phoneNo}</td>

                    {/* PROOF BUTTON */}
                <td>
  {proof ? (
    <a
      href={`http://localhost:8000/${proof}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-info btn-sm"
    >
      View Proof
    </a>
  ) : (
    <span className="text-muted">No Proof</span>
  )}
</td>

                    {/* STATUS BADGE */}
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

                    {/* ACTION BUTTONS */}
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            handleAccept(worker.commonkey._id)
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleReject(worker.commonkey._id)
                          }
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
                <td colSpan="8" className="text-center text-warning">
                  No workers found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      {/* PROOF MODAL */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Worker Proof</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedProof && (
            <img
              src={selectedProof}
              alt="Worker Proof"
              className="img-fluid rounded"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Viewworker;