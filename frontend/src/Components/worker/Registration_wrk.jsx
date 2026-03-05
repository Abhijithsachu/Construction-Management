import React, { useState } from 'react';
import './Registration_wrk.css';
import api from '../../api';
import { useNavigate, Link } from "react-router-dom";

function Registration_wrk() {
  const [image, setImage] = useState(null);
  const [proof, setProof] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobrole, setJobrole] = useState([]); // changed to array
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const jobOptions = ["Engineer", "Plumber", "Carpenter"];

  const validate = () => {
    if (!image) return "Please upload a photo.";
    if (!proof) return "Please upload proof document.";
    if (!fullname.trim()) return "Full name is required.";
    if (!/^[A-Za-z\s]+$/.test(fullname.trim()))
      return "Full name can only contain letters and spaces.";
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email.";
    if (!phone.trim()) return "Phone is required.";
    if (!/^[0-9]{10}$/.test(phone))
      return "Phone must be exactly 10 digits.";
    if (!qualification.trim()) return "Qualification is required.";
    if (jobrole.length === 0) return "Please select at least one job role.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password too short.";
    if (password !== confirmpassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("proof", proof);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("qualification", qualification);
    formData.append("jobrole", JSON.stringify(jobrole)); // send as array
    formData.append("password", password);

    try {
      await api.post("/worker/wrk_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration Successful!");
      navigate('/');

      setFullname("");
      setEmail("");
      setPhone("");
      setQualification("");
      setJobrole([]);
      setPassword("");
      setConfirmPassword("");
      setImage(null);
      setProof(null);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleFullnameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFullname(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleJobSelect = (e) => {
    const value = e.target.value;
    if (value && !jobrole.includes(value)) {
      setJobrole([...jobrole, value]);
    }
    e.target.value = "";
  };

  const removeRole = (roleToRemove) => {
    setJobrole(jobrole.filter((role) => role !== roleToRemove));
  };

  return (
    <div className="registration-page">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className="form-heading">Worker Registration</h1>
        <table>
          <tbody>
            <tr>
              <td><label>Photo</label></td>
              <td>
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setImage(e.target.files[0])} 
                />
              </td>
            </tr>

            <tr>
              <td><label>Full Name</label></td>
              <td>
                <input
                  type="text"
                  value={fullname}
                  onChange={handleFullnameChange}
                  placeholder="Enter full name"
                />
              </td>
            </tr>

            <tr>
              <td><label>Email</label></td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </td>
            </tr>

            <tr>
              <td><label>Phone</label></td>
              <td>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                />
              </td>
            </tr>

            <tr>
              <td><label>Qualification</label></td>
              <td>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="Enter qualification"
                />
              </td>
            </tr>

            <tr>
              <td><label>Job Role</label></td>
              <td>
                <div style={{ marginBottom: "8px" }}>
                  {jobrole.map((role) => (
                    <span 
                      key={role}
                      style={{
                        display: "inline-block",
                        padding: "5px 10px",
                        margin: "4px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "20px",
                        fontSize: "14px"
                      }}
                    >
                      {role}
                      <span 
                        onClick={() => removeRole(role)}
                        style={{
                          marginLeft: "8px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        ✕
                      </span>
                    </span>
                  ))}
                </div>

                <select onChange={handleJobSelect} defaultValue="">
                  <option value="" disabled>Select job role</option>
                  {jobOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td><label>Proof Document</label></td>
              <td>
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setProof(e.target.files[0])} 
                />
              </td>
            </tr>

            <tr>
              <td><label>Password</label></td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </td>
            </tr>

            <tr>
              <td><label>Confirm Password</label></td>
              <td>
                <input
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="submit-btn">
          Register
        </button>

        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration_wrk;