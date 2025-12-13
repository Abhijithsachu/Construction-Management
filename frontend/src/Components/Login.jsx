import React, { use, useState } from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const[username,setusername]=useState()
  const[password,setpassword]=useState()
  const navigate=useNavigate()
  const handlesubmit=async(e)=>{
    console.log('00000000000');
    e.preventDefault()
    const body={username,password}
    console.log(body);

    const res=await api.post("/login",body)
    localStorage.setItem("LoginId",res.data.id)
    console.log(res)
    if(res.data.role=="Vendor"){
      navigate("/Vndrhomepage")
    }
    else if(res.data.role=="Admin"){
      navigate("/homepage")
    }
    else if(res.data.role=="User"){
      navigate("/userhomepage")
    }
    else{
      navigate("/Wrkhomepage")
    }
  }

  return (
    <div className="loginpage">

      <form className="loginform" onSubmit={handlesubmit}>
        <h1 className="loginheading">Construction Management</h1>

        <div className="inputbox">
          <FaUser className="icon" />
          <input type="text"onChange={(e)=>(setusername(e.target.value))} placeholder="Username" />
        </div>

        <div className="inputbox">
          <FaLock className="icon" />
          <input type="password"onChange={(e)=>(setpassword(e.target.value))} placeholder="Password" />
        </div>

        <button className="loginbtn" type="submit">
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;

