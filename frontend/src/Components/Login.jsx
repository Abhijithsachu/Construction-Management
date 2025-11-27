import React from 'react'
import './Login.css'
function Login() {
  return (
    <div className='loginpage'>
        {/* <img src="login image.jpg" className="loginimage" alt="login image"/> */}
        <form className="loginform">
        <h1 className='loginheading'>Construction Management</h1>
      <label className="username">User name </label>
      <input type='text'></input> <br/>
      <label className="pass">Password  </label>
      <input type='password'></input><br/>
      <button>Login</button>
    
       


    </form>
    </div>
    
  )
}

export default Login
