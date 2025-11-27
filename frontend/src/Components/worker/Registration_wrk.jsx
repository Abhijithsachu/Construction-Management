import React from 'react'
import './Registration_wrk.css'
function Registration_wrk() {
  return (
    <div>
        <form className="Acc1form">
        <h1 className='Acc1heading'>Registration</h1>
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
              <label classname="qualification">Qualification</label>
            </td>
            <td>
              <input type="tel"></input><br/>
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
      </form>
    </div>
  )
}

export default Registration_wrk
