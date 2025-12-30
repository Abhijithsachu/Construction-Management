import React, { useEffect, useState } from "react";
import { Button, Badge } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Viewworker() {
  const [workers, setWorkers] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await api.get("/worker/all");
      console.log(res);
      
      setWorkers(res.data.workerDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // ✅ ACCEPT WORKER
  const handleAccept = async (loginId) => {
    console.log(loginId);
    
    try {
     let response= await api.put(`/worker/updatestatus/${loginId}`, { verify: true });
     console.log(response);
     
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ REJECT WORKER
  const handleReject = async (loginId) => {
    try {
      await api.put(`/worker/updatestatus/${loginId}`, { verify: false });
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navpage />

      {/* 🔙 HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/homepage">
          <Button variant="secondary">⬅ Back</Button>
        </Link>

        <h3 className="fw-bold">WORKER INFO</h3>

        <Link to="/workerregistration">
          <Button variant="primary">+ ADD</Button>
        </Link>
      </div>

      {/* 📋 TABLE */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
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
                 

                

                  {/* STATUS */}
                  <td>
                    <Badge
                      bg={
                        verified === true
                          ? "success"
                          : verified === false
                          ? "danger"
                          : "warning"
                      }
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
                   
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
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
                      </>
                   
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No workers found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Viewworker;
