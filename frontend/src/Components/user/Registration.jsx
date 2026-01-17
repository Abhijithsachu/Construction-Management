import React, { useState } from 'react';
import './Registration.css';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) return alert("Name is required");
    if (!/^[A-Za-z\s]+$/.test(name.trim())) return alert("Name can only contain letters and spaces");
    if (!email.trim()) return alert("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert("Invalid email");
    if (!phone.trim()) return alert("Phone is required");
    if (!/^[0-9]{10}$/.test(phone)) return alert("Phone must be exactly 10 digits");
    if (!password) return alert("Password is required");
    if (password.length < 6) return alert("Password must be at least 6 characters");
    if (password !== confirmPassword) return alert("Passwords do not match");

    const body = { name, email, phone, password };
    try {
      await api.post("/user/register", body);
      alert("Registration successful!");
      navigate('/'); // Redirect to login page

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Restrict non-alphabet characters for name
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
    }
  };

  // Restrict non-numeric characters for phone
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="registration-page">
      {/* Background Shapes & Vignette */}
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>
      <div className="bg-shape three"></div>
      <div className="vignette"></div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className="registration-heading">User Registration</h1>

        <label>Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange} 
          placeholder="Enter your full name"
        />

        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
        />

        <label>Phone</label>
        <input 
          type="tel" 
          value={phone} 
          onChange={handlePhoneChange} 
          placeholder="Enter your phone number"
        />

        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password"
        />

        <label>Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm your password"
        />

        <button type="submit">Register</button>

        {/* Login link */}
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
