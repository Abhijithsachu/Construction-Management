import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

function Viewproduct() {
  const [products, setProducts] = useState([]);
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
      console.log(id);
      const res = await api.delete(`/product/vendor/delete/${id}`);
      console.log(res);
      alert(res.data.message || "Deleted Successfully");
      fetchProducts();
    } catch (e) {
      console.log(e);
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

        {/* BACK BUTTON */}
        <div className="mb-3">
          <Button variant="light" className="fw-bold" onClick={() => navigate(-1)}>
            ⬅ Back
          </Button>
        </div>

        <h2 className="text-center fw-bold text-white mb-4">
          🏗️ My Products
        </h2>

        <div className="row g-4">
          {products.length === 0 ? (
            <p className="text-center text-light">
              No products found
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
                        Qty: {item.Quantity}
                      </span>
                    </div>

                    <Link
                      to={`/editproduct/${item._id}`}
                      className="btn btn-outline-primary mt-auto w-100"
                    >
                      ✏️ Edit Product
                    </Link>
                    <Button
                      variant="outline-danger mt-3 w-100"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
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

export default Viewproduct;
