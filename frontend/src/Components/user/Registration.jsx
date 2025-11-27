  import React from 'react'
  import './Registration.css'
  function Registration() {
    return (
      <div className='Registrationpage'>
          {/* <img src="login image.jpg" className="loginimage" alt="login image"/> */}
          <form className="registrationform">
          <h1 className='Registrationheading'>Registration</h1>
          <table>
            <tr>
              <td>
        <label className="fullname">Full Name </label>

              </td>
              <td>
        <input type='text'></input> <br/>

              </td>
            </tr>

            <tr>
              <td>
                <label className="Email">Email  </label>
              </td>
              <td>
                <input type='email'></input><br/>
              </td>
            </tr>

            <tr>
              <td>
                <label className="phone">Phone </label>
              </td>
              <td>
                <input type='tel'></input><br/>
              </td>
            </tr>

            <tr>
              <td>
                <label className="password">Password </label>
              </td>
              <td>
                <input type='password'></input><br/>
              </td>
            </tr>
        
            <tr>
              <td>
                <label className="confirmpassword">Confirm Password</label>
              </td>
              <td>
                <input type='password'></input><br/>
              </td>
            </tr>
        
      
      
        
      
        </table>
        <button>Registration</button>
      
        


      </form>
      </div>
      
    )
  }

  export default Registration