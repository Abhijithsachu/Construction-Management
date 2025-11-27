  import React, { useState } from 'react'
  import './Registration.css'
import api from '../../api'
  function Registration() {
    const [name,setname]=useState()
    const [email,setemail]=useState()
    const [phone,setphone]=useState()
    const [password,setpassword]=useState()
    const [confirmpassword,setconfirmpassword]=useState()
    const handlesubmit=async(e)=>{
      console.log('00000000000');
      
      e.preventDefault()
      const body={name,email,phone,password}
      console.log(body);
      
    const res= await api.post("/user/register",body)
    console.log(res)
    
  
  }

        return (
      <div className='Registrationpage'>
          {/* <img src="login image.jpg" className="loginimage" alt="login image"/> */}
          <form className="registrationform" onSubmit={handlesubmit}>
          <h1 className='Registrationheading'>Registration</h1>
          <table>
            <tr>
              <td>
        <label className="fullname">Full Name </label>

              </td>
              <td>
        <input type='text'onChange={(e)=>{setname(e.target.value)}}></input> <br/>

              </td>
            </tr>

            <tr>
              <td>
                <label className="Email">Email  </label>
              </td>
              <td>
                <input type='email'onChange={(e)=>{setemail(e.target.value)}}></input><br/>
              </td>
            </tr>

            <tr>
              <td>
                <label className="phone">Phone </label>
              </td>
              <td>
                <input type='tel'onChange={(e)=>{setphone(e.target.value)}}></input><br/>
              </td>
            </tr>

            <tr>
              <td>
                <label className="password">Password </label>
              </td>
              <td>
                <input type='password'onChange={(e)=>{setpassword(e.target.value)}}></input><br/>
              </td>
            </tr>
        
            <tr>
              <td>
                <label className="confirmpassword">Confirm Password</label>
              </td>
              <td>
                <input type='password'onChange={(e)=>{setconfirmpassword(e.target.value)}}></input><br/>
              </td>
            </tr>
        
      
      
        
      
        </table>
        <button type='submit'>Registration</button>
      
        


      </form>
      </div>
      
    )
  }

  export default Registration