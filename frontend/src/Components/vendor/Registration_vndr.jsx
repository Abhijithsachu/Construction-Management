import React, { useState } from 'react';
import './Registration_vndr.css';
import api from '../../api';
import { useNavigate } from "react-router-dom";

function Registration_vndr() {
  const [CompanyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [Location, setLocation] = useState();
  const [CompanyLogo, setCompanyLogo] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const validate = () => {
    if (!CompanyLogo) return "Please upload a photo.";
    if (!CompanyName?.trim()) return "Company name is required.";
    if (!email?.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email.";
    if (!phoneNo?.trim()) return "Phone is required.";
    if (!/^[0-9]{10}$/.test(phoneNo)) return "Phone must be 10 digits.";
    if (!Location?.trim()) return "Add your location";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password too short.";
    if (password !== confirmpassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    const formData = new FormData();
    formData.append("image", CompanyLogo);
    formData.append("CompanyName", CompanyName);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);
    formData.append("Location", Location);
    formData.append("password", password);

    try {
      const res = await api.post("/vendor/vndr_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration Successful!");
      navigate('/');
      setCompanyName(""); setEmail(""); setPhoneNo(""); setLocation("");
      setPassword(""); setConfirmpassword(""); setCompanyLogo(null);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='registration-page'>
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <form className="vndrform" onSubmit={handleSubmit}>
        <h1 className='vndrheading'>Vendor Registration</h1>

        <label>Company Name</label>
        <input type="text" onChange={(e)=>setCompanyName(e.target.value)} />

        <label>Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} />

        <label>Phone No</label>
        <input type="tel" onChange={(e)=>setPhoneNo(e.target.value)} />

        <label>Location</label>
        <input type="text" onChange={(e)=>setLocation(e.target.value)} />

        <label>Company Logo</label>
        <input type="file" onChange={(e)=>setCompanyLogo(e.target.files[0])} />

        <label>Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} />

        <label>Confirm Password</label>
        <input type="password" onChange={(e)=>setConfirmpassword(e.target.value)} />

        <button className="submitBtn">Register</button>
      </form>
    </div>
  );
}

export default Registration_vndr;
