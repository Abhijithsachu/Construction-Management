import React, { useState } from 'react'
import './Registration_vndr.css'
import api from '../../api'
import { useNavigate } from "react-router-dom";

function Registration_vndr() {
  const [CompanyName,setCompanyName]=useState()
  const [email,setemail]=useState()
  const [phoneNo,setphoneNo]=useState()
  const [Location,setLocation]=useState()
  const [CompanyLogo,setCompanyLogo]=useState()
  const [password,setpassword]=useState()
  const [confirmpassword,setconfirmpassword]=useState()
  const navigate= useNavigate()

  const validate = () => {
    if (!CompanyLogo) return "Please upload a photo.";
    if (!CompanyName.trim()) return "Full name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email.";
    if (!phoneNo.trim()) return "Phone is required.";
    if (!/^[0-9]{10}$/.test(phoneNo)) return "Phone must be 10 digits.";
    if (!Location) return "Add your location"
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password too short.";
    if (password !== confirmpassword) return "Passwords do not match.";
    return null;
  };

  const handlesubmit=async(e)=>{
      
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
navigate('/')
      setCompanyName("");
      setemail("");
      setphoneNo("");
      setLocation("");
      setpassword("");
      setconfirmpassword("");
      setCompanyLogo(null);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
    
  }
  return (
    <div className='vndrpage'>
      <form className="vndrform"  onSubmit={handlesubmit}>
        <h1 className='vndrheading'>Registration</h1>

        <table>
          <tr>
            <td><label className="CompanyName">Company Name</label></td>
            <td><input type="text" onChange={(e)=>{setCompanyName(e.target.value)}} /></td>
          </tr>

          <tr>
            <td><label className="Email">Email</label></td>
            <td><input type="email" onChange={(e)=>{setemail(e.target.value)}}/></td>
          </tr>

          <tr>
            <td><label className="phoneNo">Phone No</label></td>
            <td><input type="tel" onChange={(e)=>{setphoneNo(e.target.value)}}/></td>
          </tr>

          <tr>
            <td><label className="Location">Location</label></td>
            <td><input type="text" onChange={(e)=>{setLocation(e.target.value)}}/></td>
          </tr>

          <tr>
            <td><label className="CompanyLogo">Company Logo</label></td>
            <td><input type="file" onChange={(e)=>{setCompanyLogo(e.target.files[0])}}/></td>
          </tr>

          <tr>
            <td><label className="password">Password</label></td>
            <td><input type="password" onChange={(e)=>{setpassword(e.target.value)}}/></td>
          </tr>

          <tr>
            <td><label className="confirmpassword">Confirm Password</label></td>
            <td><input type="password" onChange={(e)=>{setconfirmpassword(e.target.value)}}/></td>
          </tr>
        </table>

        <button className="submitBtn">Register</button>
      </form>
    </div>
  )
}

export default Registration_vndr
