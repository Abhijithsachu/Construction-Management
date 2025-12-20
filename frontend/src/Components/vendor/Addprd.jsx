

import React, { useEffect, useState } from "react";
import api from "../../api";

function Addprd() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [shopId, setShopId] = useState("");

  const LoginId = localStorage.getItem("LoginId");

  // Fetch shop id
  const getShop = async () => {
    try {
      const res = await api.get(`/vendor/details/${LoginId}`);
      setShopId(res.data.shop._id);
    } catch (error) {
      console.error("Failed to fetch shop:", error);
    }
  };

  useEffect(() => {
    if (LoginId) {
      getShop();
    }
  }, [LoginId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProduct((prev) => ({ ...prev, photo: file }));
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopId) {
      alert("Shop not found. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
    formData.append("photo", product.photo);
    formData.append("shopId", shopId);

    // Debug FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // 🔹 API CALL (uncomment when backend is ready)

    try {
     const res= await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      
      alert("Product added successfully!");
    } catch (err) {
        console.log(err);
        
      alert(err.response?.data?.message || "Something went wrong");
      return;
    }


    alert("Product added successfully!");

    // Reset form
    setProduct({
      name: "",
      price: "",
      quantity: "",
      description: "",
      photo: null,
    });
    setPreview(null);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Product</h4>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Photo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />
            </div>

            {preview && (
              <div className="mb-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Add Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Addprd;
