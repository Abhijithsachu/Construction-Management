import React, { useState } from 'react';
import './Registration_wrk.css';
import api from '../../api';
import { useNavigate, Link } from "react-router-dom";

function Registration_wrk() {
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobrole, setJobrole] = useState("Engineer");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!image) return "Please upload a photo.";
    if (!fullname.trim()) return "Full name is required.";
    if (!/^[A-Za-z\s]+$/.test(fullname.trim())) return "Full name can only contain letters and spaces.";
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email.";
    if (!phone.trim()) return "Phone is required.";
    if (!/^[0-9]{10}$/.test(phone)) return "Phone must be exactly 10 digits.";
    if (!qualification.trim()) return "Qualification is required.";
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
    formData.append("image", image);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("qualification", qualification);
    formData.append("jobrole", jobrole);
    formData.append("password", password);

    try {
      await api.post("/worker/wrk_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration Successful!");
      navigate('/login'); // Navigate to login page after registration

      // Reset fields
      setFullname(""); 
      setEmail(""); 
      setPhone(""); 
      setQualification("");
      setJobrole("Engineer"); 
      setPassword(""); 
      setConfirmPassword(""); 
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Restrict full name input to letters and spaces
  const handleFullnameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFullname(value);
    }
  };

  // Restrict phone input to numbers only
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="registration-page">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className="form-heading">Worker Registration</h1>
        <table>
          <tbody>
            <tr>
              <td><label>Photo</label></td>
              <td><input type="file" onChange={(e) => setImage(e.target.files[0])} /></td>
            </tr>
            <tr>
              <td><label>Full Name</label></td>
              <td><input type="text" value={fullname} onChange={handleFullnameChange} placeholder="Enter full name" /></td>
            </tr>
            <tr>
              <td><label>Email</label></td>
              <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" /></td>
            </tr>
            <tr>
              <td><label>Phone</label></td>
              <td><input type="tel" value={phone} onChange={handlePhoneChange} placeholder="Enter phone number" /></td>
            </tr>
            <tr>
              <td><label>Qualification</label></td>
              <td><input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="Enter qualification" /></td>
            </tr>
            <tr>
              <td><label>Job Role</label></td>
              <td>
                <select value={jobrole} onChange={(e) => setJobrole(e.target.value)}>
                  <option value="Engineer">Engineer</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" /></td>
            </tr>
            <tr>
              <td><label>Confirm Password</label></td>
              <td><input type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" /></td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="submit-btn">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration_wrk;
