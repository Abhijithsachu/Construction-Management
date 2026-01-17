import React, { useEffect, useState } from "react";
import "./Addprd.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";

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

  const LoginId = localStorage.getItem("VLoginId");
  const navigate = useNavigate();

  const getShop = async () => {
    try {
      const res = await api.get(`/vendor/details/${LoginId}`);
      setShopId(res.data.shop._id);
    } catch (error) {
      console.error("Failed to fetch shop:", error);
    }
  };

  useEffect(() => {
    if (LoginId) getShop();
  }, [LoginId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow alphabets and spaces for product name
    if (name === "name") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProduct((prev) => ({ ...prev, photo: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopId) {
      alert("Shop not found. Please try again.");
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("shopId", shopId);

    try {
      await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      return;
    }

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
    <div className="vndrpage">
      {/* BACKGROUND */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      {/* BACK BUTTON */}
      <button onClick={() => navigate(-1)} className="back-btn">
        ⬅ Back
      </button>

      <div className="vndrform addprd-form">
        <h3 className="vndrheading">Add Product</h3>

        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            pattern="^[A-Za-z\s]+$"
            title="Product name should contain only alphabets"
          />

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            required
          />

          <label>Product Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />

          {preview && (
            <div className="preview-box">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submitBtn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addprd;
