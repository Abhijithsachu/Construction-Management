import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";

function RequestPrdct() {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product"); // all products
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequest = async (productId) => {
    try {
      const res = await api.post("/product/request", {
        productId,
        userId,
      });
      alert(res.data.message || "Product requested successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to request product");
    }
  };

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
          📦 Request Products
        </h2>

        <div className="row g-4">
          {products.length === 0 ? (
            <p className="text-center text-light">
              No products available
            </p>
          ) : (
            products.map((item) => (
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

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success fs-6">
                        ₹ {item.price}
                      </span>
                      <span className="badge bg-secondary">
                        Available: {item.Quantity}
                      </span>
                    </div>

                    <Button
                      variant="warning"
                      className="mt-auto fw-bold w-100"
                      onClick={() => handleRequest(item._id)}
                    >
                      📥 Request Product
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
