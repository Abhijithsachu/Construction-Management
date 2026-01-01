import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Navpage from "./Navpage";
import api from "../../api";

function Verifyvendor() {
  const [vendors, setVendors] = useState([]);

  // Fetch vendors
  const fetchDetails = async () => {
    try {
      const res = await api.get("/vendor/viewvendor");
      // console.log(res.data.vendor, "VENDOR DATA");
      setVendors(res.data.vendor);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // ✅ ACCEPT VENDOR
  const handleAccept = async (loginId) => {
    try {
      await api.put(`/vendor/vendorsstatus/${loginId}`, {
        verify: true,
      });
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ REJECT VENDOR
  const handleReject = async (loginId) => {
    try {
      await api.put(`/vendor/vendorsstatus/${loginId}`, {
        verify: false,
      });
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  };
console.log(vendors);

  return (
    <div>
      <Navpage />

      <div className="position-relative mb-3">
        <Link to="/homepage" className="position-absolute start-0">
          <Button variant="secondary">⬅ Back</Button>
        </Link>
        <h3 className="fw-bold text-center">VENDOR INFO</h3>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Phone No</th>
            <th>Username</th>
            <th>Action</th>
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
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      handleAccept(vendor.commonkey._id)
                    }
                  >
                    Unblock
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleReject(vendor.commonkey._id)
                    }
                  >
                    Block
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No vendors found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Verifyvendor;
