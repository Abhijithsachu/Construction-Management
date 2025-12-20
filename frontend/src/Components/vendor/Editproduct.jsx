import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

function Editproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await api.get(`/product/${id}`);
    setName(res.data.productname);
    setPrice(res.data.price);
    setQuantity(res.data.Quantity);
    setDescription(res.data.Description);
    setOldImage(res.data.Photo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);

    await api.put(
      `/product/update/${id}`,
      formData
    );

    alert("Product Updated Successfully");
    navigate("/viewprdt");
  };

  return (
    <div className="container mt-4">
      <h3>Edit Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />

        <input
          className="form-control mb-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          className="form-control mb-2"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />

        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <p>Current Image</p>
        <img
          src={`http://localhost:8000/${oldImage}`}
          alt="product"
          height="120"
        />

        <input
          type="file"
          className="form-control mt-2"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button className="btn btn-primary mt-3">
          Update Product
        </button>
        
      </form>
    </div>
  );
}

export default Editproduct;
