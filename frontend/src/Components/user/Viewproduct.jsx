import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UserViewProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/allproduct"); // USER API
      console.log(res);
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.productname?.toLowerCase().includes(term) || // search by shop name
      item.price?.toString().includes(term)          // search by price
    );
  });

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold text-white mb-4">
          🧱 Construction Materials
        </h2>

        {/* SEARCH BAR */}
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by Shop Name or Price..."
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
                  {/* Product Image */}
                  <img
                    src={`http://localhost:8000/${item.Photo}`}
                    className="card-img-top"
                    alt={item.productname}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">
                      {item.productname}
                    </h5>

                    <p className="card-text text-muted small">
                      {item.Description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-warning text-dark fs-6">
                        ₹ {item.price}
                      </span>
                      <span className="badge bg-secondary">
                        Available: {item.Quantity}
                      </span>
                    </div>

                    {/* Buttons */}
                    <Button variant="outline-dark" className="mb-2 w-100">
                      View Details
                    </Button>

                    <Button variant="warning" className="fw-bold w-100">
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
  );
}

export default UserViewProduct;
