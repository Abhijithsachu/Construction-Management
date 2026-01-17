import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import Button from "react-bootstrap/Button";
import "./Addprd.css";

function Editproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await api.get(`/product/${id}`);
    setProduct({
      name: res.data.productname,
      price: res.data.price,
      quantity: res.data.Quantity,
      description: res.data.Description,
      photo: null,
    });
    setOldImage(res.data.Photo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    await api.put(`/product/update/${id}`, formData);
    alert("Product Updated Successfully");
    navigate("/viewprdt");
  };

  return (
    <div className="vndrpage">
      {/* BACKGROUND SHAPES */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <div className="container py-4">
        <button onClick={() => navigate(-1)} className="back-btn">
          ⬅ Back
        </button>

        <div className="vndrform glass-form">
          <h3 className="vndrheading">✏️ Edit Product</h3>

          <form onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />

            <div className="form-row">
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={product.description}
              onChange={handleChange}
              required
            />

            <label>Current Image</label>
            <div className="preview-box">
              <img
                src={`http://localhost:8000/${oldImage}`}
                alt="Current"
              />
            </div>

            <label>Replace Image</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />

            {preview && (
              <div className="preview-box">
                <img src={preview} alt="New Preview" />
              </div>
            )}

            <button type="submit" className="submitBtn">
              🔄 Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editproduct;
