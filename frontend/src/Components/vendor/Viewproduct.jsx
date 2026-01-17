import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./Addprd.css"; // ✅ same background CSS

function Viewproduct() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const vendorId = localStorage.getItem("vendorId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/product/vendor/${vendorId}`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/product/vendor/delete/${id}`);
      alert(res.data.message || "Deleted Successfully");
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const openReviewModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return "⭐".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  return (
    <div className="vndrpage">
      {/* BACKGROUND SHAPES */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <div className="container py-4">
        {/* BACK */}
        <Button
          variant="light"
          className="fw-bold mb-3"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </Button>

        <h2 className="text-center fw-bold text-white mb-4">
          🏗️ My Products
        </h2>

        <div className="row g-4">
          {products.length === 0 ? (
            <p className="text-center text-light">No products found</p>
          ) : (
            products.map((item) => (
              <div className="col-lg-4 col-md-6" key={item._id}>
                <div className="card h-100 shadow-lg border-0">
                  <img
                    src={`http://localhost:8000/${item.Photo}`}
                    className="card-img-top"
                    alt={item.productname}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold">{item.productname}</h5>

                    <p className="text-muted small">{item.Description}</p>

                    {/* PRICE & QTY */}
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-success">
                        ₹ {item.price}
                      </span>
                      <span className="badge bg-secondary">
                        Qty: {item.Quantity}
                      </span>
                    </div>

                    {/* ⭐ RATING */}
                    <div className="mb-2">
                      <strong>Rating:</strong>{" "}
                      <span className="text-warning">
                        {renderStars(item.rating?.avgrating || 0)}
                      </span>
                      <span className="text-muted ms-1">
                        ({item.rating?.reviews?.length || 0})
                      </span>
                    </div>

                    {/* VIEW REVIEWS BUTTON */}
                    {item.rating?.reviews?.length > 0 && (
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="mb-3"
                        onClick={() => openReviewModal(item)}
                      >
                        💬 View Reviews ({item.rating.reviews.length})
                      </Button>
                    )}

                    <Link
                      to={`/editproduct/${item._id}`}
                      className="btn btn-outline-primary mt-auto w-100"
                    >
                      ✏️ Edit Product
                    </Link>

                    <Button
                      variant="outline-danger"
                      className="mt-2 w-100"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑 Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= REVIEW MODAL ================= */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            📝 Reviews – {selectedProduct?.productname}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedProduct?.rating?.reviews?.length > 0 ? (
            selectedProduct.rating.reviews.map((rev, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between">
                  <strong>👤 {rev.userId?.name || "Anonymous"}</strong>
                  <span className="text-warning">
                    {"⭐".repeat(rev.rating)}
                  </span>
                </div>

                <p className="mt-2 mb-1">{rev.review || "No comment"}</p>

                <small className="text-muted">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No reviews available</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Viewproduct;
