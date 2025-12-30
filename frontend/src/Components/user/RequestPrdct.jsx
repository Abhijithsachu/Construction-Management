import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

function RequestPrdct() {
  const [products, setProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/productbooking/details/${userId}`);
      setProducts(res.data.booking);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ CANCEL BOOKING
  const handleCancel = async (bookingId) => {
    try {
      await api.put(`/productbooking/cancel/${bookingId}`);
      alert("Booking cancelled successfully ❌");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Only pending bookings can be cancelled");
    }
  };

  // ✅ STATUS BADGE
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "Approved":
        return <Badge bg="primary">Approved</Badge>;
      case "Shipped":
        return <Badge bg="info">Shipped</Badge>;
      case "Delivered":
        return <Badge bg="success">Delivered</Badge>;
      case "Cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // ✅ FILTER LOGIC
  const filteredProducts =
    filterStatus === "All"
      ? products
      : products.filter((item) => item.status === filterStatus);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "40px",
        position: "relative",
      }}
    >
      {/* BACK BUTTON */}
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          fontWeight: "bold",
        }}
      >
        ⬅ Back
      </Button>

      <div className="container">
        <h2 className="text-center fw-bold text-white mb-4">
          📦 My Requested Products
        </h2>

        {/* 🔽 FILTER */}
        <div className="d-flex justify-content-end mb-4">
          <select
            className="form-select w-auto fw-bold"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="row g-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-light">No bookings found</p>
          ) : (
            [...filteredProducts].reverse().map((item) => (
              <div className="col-lg-4 col-md-6" key={item._id}>
                <div className="card h-100 shadow-lg border-0">
                  <img
                    src={`http://localhost:8000/${item.productId?.Photo}`}
                    className="card-img-top"
                    alt={item.productId?.productname}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">
                      {item.productId?.productname}
                    </h5>

                    <p className="card-text text-muted small">
                      {item.productId?.Description}
                    </p>

                    <div className="mb-2">
                      Status: {getStatusBadge(item.status)}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success fs-6">
                        ₹ {item.productId?.price}
                      </span>
                      <span className="fw-bold text-dark">
                        Total: ₹ {item.totalamount}
                      </span>
                    </div>

                    <div className="mb-3">
                      <Badge bg="secondary">
                        Quantity: {item.quantity}
                      </Badge>
                    </div>

                    <Button
                      variant="outline-danger"
                      className="mt-auto fw-bold w-100"
                      disabled={item.status !== "pending"}
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestPrdct;
