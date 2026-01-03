import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function UserViewProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/allproduct");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= STAR RENDER =================
  const renderStars = (avgRating = 0) => {
    const stars = [];
    const rounded = Math.round(avgRating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= rounded ? "#FFD700" : "#ccc",
            fontSize: "18px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // ================= MODAL =================
  const handleShow = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setAddress("");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
  };

  const totalPrice =
    selectedProduct ? selectedProduct.price * quantity : 0;

  // ================= REQUEST QUOTE =================
  const handleSubmitRequest = async () => {
    if (!selectedProduct) return;

    try {
      const body = {
        userId,
        productId: selectedProduct._id,
        quantity,
        pricePerUnit: selectedProduct.price,
        totalPrice,
        address,
      };

      await api.post("/productbooking/add", body);
      alert("Quote request submitted successfully ✅");
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Failed to submit request ❌");
    }
  };

  // ================= SEARCH FILTER =================
  const filteredProducts = products.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.productname?.toLowerCase().includes(term) ||
      item.price?.toString().includes(term)
    );
  });

  // ================= UI =================
  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
          backgroundSize: "cover",
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
            fontWeight: "bold",
          }}
        >
          ⬅ Back
        </Button>

        <div className="container">
          <h2 className="text-center fw-bold text-white mb-4">
            🧱 Construction Materials
          </h2>

          {/* SEARCH */}
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search by name or price..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          {/* PRODUCTS */}
          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-light">No products available</p>
            ) : (
              filteredProducts.map((item) => (
                <div className="col-lg-4 col-md-6" key={item._id}>
                  <div className="card h-100 shadow-lg border-0">
                    <img
                      src={`http://localhost:8000/${item.Photo}`}
                      alt={item.productname}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-semibold">{item.productname}</h5>
                      <p className="text-muted small">{item.Description}</p>

                      {/* ⭐ RATING */}
                      {item.rating?.reviews?.length > 0 && (
                        <div className="mb-2">
                          {renderStars(item.rating.avgrating)}
                          <span className="text-muted ms-2">
                            ({item.rating.reviews.length})
                          </span>
                        </div>
                      )}

                      <div className="d-flex justify-content-between mb-3">
                        <span className="badge bg-warning text-dark fs-6">
                          ₹ {item.price}
                        </span>
                        <span className="badge bg-secondary">
                          Available: {item.Quantity}
                        </span>
                      </div>

                      <Button
                        variant="outline-dark"
                        className="mb-2 w-100"
                      >
                        View Details
                      </Button>

                      <Button
                        variant="warning"
                        className="fw-bold w-100"
                        onClick={() => handleShow(item)}
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Quote</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  value={selectedProduct.productname}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Price (₹)</Form.Label>
                <Form.Control
                  value={totalPrice}
                  disabled
                  className="fw-bold text-success"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="warning"
            className="fw-bold"
            onClick={handleSubmitRequest}
          >
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserViewProduct;
