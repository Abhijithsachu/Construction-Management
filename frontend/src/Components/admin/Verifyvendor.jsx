import React, { useEffect, useState } from "react";
import { Button, Badge, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Verifyvendor() {
  const [vendors, setVendors] = useState([]);

  const fetchDetails = async () => {
    const res = await api.get("/vendor/viewvendor");
    setVendors(res.data.vendor);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleAccept = async (loginId) => {
    await api.put(`/vendor/vendorsstatus/${loginId}`, { verify: true });
    fetchDetails();
  };

  const handleReject = async (loginId) => {
    await api.put(`/vendor/vendorsstatus/${loginId}`, { verify: false });
    fetchDetails();
  };

  return (
    <div className="verifyvendor-page bg-dark min-vh-100 text-white">
      <Navpage />

      <Container className="mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <Link to="/homepage">
            <Button variant="secondary">⬅ Back</Button>
          </Link>
          <h3 className="fw-bold text-center w-100 mb-0">VENDOR INFO</h3>
          <div></div>
        </div>

        <Table striped bordered hover responsive className="table-dark align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Phone No</th>
              <th>Email / Username</th>
              <th>Status / Action</th>
            </tr>
          </thead>

          <tbody>
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>{index + 1}</td>
                  <td>{vendor.Name}</td>
                  <td>{vendor.phoneNo}</td>
                  <td>{vendor.email}</td>
                  <td>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      {vendor.commonkey?.verify === true ? (
                        <>
                          <Badge bg="success">Unblocked</Badge>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleReject(vendor.commonkey._id)}
                          >
                            Block
                          </Button>
                        </>
                      ) : vendor.commonkey?.verify === false ? (
                        <>
                          <Badge bg="danger">Blocked</Badge>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleAccept(vendor.commonkey._id)}
                          >
                            Unblock
                          </Button>
                        </>
                      ) : (
                        <Badge bg="warning" className="text-dark">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-warning">
                  No vendors found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Verifyvendor;
