import React, { useState } from 'react';
import './Registration_wrk.css';
import api from '../../api';
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registration_wrk() {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    qualification: '',
    jobrole: [],
    password: '',
    confirmPassword: ''
  });

  const [files, setFiles] = useState({
    image: null,
    proof: null
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const jobOptions = ["Engineer", "Plumber", "Carpenter"];

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // File change
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // Job select
  const handleJobSelect = (e) => {
    const value = e.target.value;
    if (value && !form.jobrole.includes(value)) {
      setForm({ ...form, jobrole: [...form.jobrole, value] });
    }
    e.target.value = "";
  };

  const removeRole = (roleToRemove) => {
    setForm({
      ...form,
      jobrole: form.jobrole.filter((role) => role !== roleToRemove)
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    // Image
    if (!files.image) {
      newErrors.image = "Photo is required";
    }

    // Proof
    if (!files.proof) {
      newErrors.proof = "Proof document is required";
    }

    // Name
    if (!form.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.fullname)) {
      newErrors.fullname = "Only letters allowed";
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
      newErrors.phone = "Enter valid 10-digit number";
    }

    // Qualification
    if (!form.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    // Job role
    if (form.jobrole.length === 0) {
      newErrors.jobrole = "Select at least one job role";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(form.password)) {
      newErrors.password = "Must contain 1 uppercase, 1 number & min 6 chars";
    }

    // Confirm password
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
    formData.append("image", files.image);
    formData.append("proof", files.proof);
    formData.append("fullname", form.fullname);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("qualification", form.qualification);
    formData.append("jobrole", JSON.stringify(form.jobrole));
    formData.append("password", form.password);

    try {
      await api.post("/worker/wrk_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration Successful!");

      navigate('/');

      // Reset
      setForm({
        fullname: '',
        email: '',
        phone: '',
        qualification: '',
        jobrole: [],
        password: '',
        confirmPassword: ''
      });

      setFiles({
        image: null,
        proof: null
      });

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="registration-page">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className="form-heading">Worker Registration</h1>

        {/* Photo */}
        <label>Photo</label>
        <input type="file" name="image" onChange={handleFileChange} />
        {errors.image && <span className="error">{errors.image}</span>}

        {/* Name */}
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
        />
        {errors.fullname && <span className="error">{errors.fullname}</span>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        {/* Phone */}
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        {/* Qualification */}
        <label>Qualification</label>
        <input
          type="text"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
        />
        {errors.qualification && <span className="error">{errors.qualification}</span>}

        {/* Job Role */}
        <label>Job Role</label>
        <div>
          {form.jobrole.map((role) => (
            <span key={role} className="chip">
              {role}
              <span onClick={() => removeRole(role)}> ✕</span>
            </span>
          ))}
        </div>

        <select onChange={handleJobSelect} defaultValue="">
          <option value="" disabled>Select job role</option>
          {jobOptions.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {errors.jobrole && <span className="error">{errors.jobrole}</span>}

        {/* Proof */}
        <label>Proof</label>
        <input type="file" name="proof" onChange={handleFileChange} />
        {errors.proof && <span className="error">{errors.proof}</span>}

        {/* Password */}
        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
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
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit" className="submit-btn">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration_wrk;