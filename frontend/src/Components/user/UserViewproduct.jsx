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

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/allproduct");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleSubmitRequest = async () => {
    // if (!selectedProduct) return;

    // if (!address.trim()) {
    //   alert("Please enter delivery address");
    //   return;
    // }

    try {
      const body = {
        userId: userId,
        productId: selectedProduct._id,
        quantity: quantity,
        pricePerUnit: selectedProduct.price,
        totalPrice: totalPrice,
        address: address,
      };
console.log('hit');

     let res=await api.post("/productbooking/add", body);
console.log (res,"pppppp")
      alert("Quote request submitted successfully ✅");
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Failed to submit request ❌");
    }
  };

  const filteredProducts = products.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.productname?.toLowerCase().includes(term) ||
      item.price?.toString().includes(term)
    );
  });

  return (
    <>
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
            🧱 Construction Materials
          </h2>

          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search by Product Name or Price..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-light">No products available</p>
            ) : (
              filteredProducts.map((item) => (
                <div className="col-lg-4 col-md-6" key={item._id}>
                  <div className="card h-100 shadow-lg border-0">
                    <img
                      src={`http://localhost:8000/${item.Photo}`}
                      className="card-img-top"
                      alt={item.productname}
                      style={{ height: "220px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-semibold">
                        {item.productname}
                      </h5>

                      <p className="card-text text-muted small">
                        {item.Description}
                      </p>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="badge bg-warning text-dark fs-6">
                          ₹ {item.price}
                        </span>
                        <span className="badge bg-secondary">
                          Available: {item.Quantity}
                        </span>
                      </div>

                      <Button variant="outline-dark" className="mb-2 w-100">
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

      {/* REQUEST QUOTE MODAL */}
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
                  type="text"
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
                <Form.Label>Price per Unit (₹)</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.price}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Price (₹)</Form.Label>
                <Form.Control
                  type="text"
                  value={totalPrice}
                  disabled
                  className="fw-bold text-success"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Alternative Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter delivery address"
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
