import React, { useState } from 'react';
import './Registration.css';
import api from '../../api';

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, email, phone, password };
    try {
      const res = await api.post("/user/register", body);
      console.log(res);
    } catch (error) {
      console.error(error);
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
        <input type="text" onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <label>Phone</label>
        <input type="tel" onChange={(e) => setPhone(e.target.value)} />

        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password</label>
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
