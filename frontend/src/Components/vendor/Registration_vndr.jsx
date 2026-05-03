import React, { useState } from 'react';
import './Registration_vndr.css';
import api from '../../api';
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registration_vndr() {
  const [form, setForm] = useState({
    companyName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: ''
  });

  const [companyLogo, setCompanyLogo] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    // Company Name
 if (!form.companyName.trim()) {
  newErrors.companyName = "Company name is required";
} else if (!/^[A-Za-z0-9\s]+$/.test(form.companyName)) {
  newErrors.companyName = "No special characters allowed";
}

    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone
    if (!form.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    // Location
    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Logo
    if (!companyLogo) {
      newErrors.companyLogo = "Company logo is required";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(form.password)) {
      newErrors.password = "Must contain 1 uppercase, 1 number & min 6 chars";
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("image", companyLogo);
    formData.append("CompanyName", form.companyName);
    formData.append("email", form.email);
    formData.append("phoneNo", form.phone);
    formData.append("Location", form.location);
    formData.append("password", form.password);

    try {
      await api.post("/vendor/vndr_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration Successful!");

      // Reset
      setForm({
        companyName: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        confirmPassword: ''
      });
      setCompanyLogo(null);

      navigate('/');

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='registration-page'>
      <form className="vndrform" onSubmit={handleSubmit}>
        <h1 className='vndrheading'>Vendor Registration</h1>

        {/* Company Name */}
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
        />
        {errors.companyName && <span className="error">{errors.companyName}</span>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        {/* Phone */}
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        {/* Location */}
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
        {errors.location && <span className="error">{errors.location}</span>}

        {/* Logo */}
        <label>Company Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCompanyLogo(e.target.files[0])}
        />
        {errors.companyLogo && <span className="error">{errors.companyLogo}</span>}

        {/* Password */}
        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit" className="submitBtn">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration_vndr;