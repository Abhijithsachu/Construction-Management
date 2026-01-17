import React, { useState } from 'react';
import './Registration_vndr.css';
import api from '../../api';
import { useNavigate, Link } from "react-router-dom";

function Registration_vndr() {
  const [CompanyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [Location, setLocation] = useState('');
  const [CompanyLogo, setCompanyLogo] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!CompanyLogo) return "Please upload a company logo.";
    if (!CompanyName.trim()) return "Company name is required.";
    if (!/^[A-Za-z\s]+$/.test(CompanyName.trim())) return "Company name can only contain letters and spaces.";
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email address.";
    if (!phoneNo.trim()) return "Phone number is required.";
    if (!/^[0-9]{10}$/.test(phoneNo)) return "Phone number must be 10 digits.";
    if (!Location.trim()) return "Location is required.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password.trim() !== confirmpassword.trim()) return "Passwords do not match.";
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
      await api.post("/vendor/vndr_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration Successful!");

      // Clear fields
      setCompanyName('');
      setEmail('');
      setPhoneNo('');
      setLocation('');
      setPassword('');
      setConfirmPassword('');
      setCompanyLogo(null);

      navigate('/'); // Redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Prevent invalid characters while typing
  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setCompanyName(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhoneNo(value);
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
        <input
          type="text"
          value={CompanyName}
          onChange={handleCompanyNameChange}
          placeholder="Enter company name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <label>Phone No</label>
        <input
          type="tel"
          value={phoneNo}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
        />

        <label>Location</label>
        <input
          type="text"
          value={Location}
          onChange={(e)=>setLocation(e.target.value)}
          placeholder="Enter location"
        />

        <label>Company Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e)=>setCompanyLogo(e.target.files[0])}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmpassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />

        <button className="submitBtn" type="submit">Register</button>

        {/* Link to Login Page */}
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration_vndr;
