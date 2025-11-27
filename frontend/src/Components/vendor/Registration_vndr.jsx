import React from 'react'
import './Registration_vndr.css'
function Registration_vndr() {
  return (
    <div className='vndrpage'>
      <form className="vndrform">
        <h1 className='vndrheading'>Registration</h1>
        <table>
          <tr>
            <td>
      <label className="CompanyName">Company Name </label>
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
              <label className="phoneNo">Phone No </label>
            </td>
            <td>
              <input type='tel'></input><br/>
            </td>
          </tr>
          <tr>
            <td>
              <label classname="Location">Location</label>
            </td>
            <td>
              <input type="text"></input><br/>
            </td>
          </tr>

        <tr>
            <td>
              <label classname="CompanyLogo">Company Logo</label>
            </td>
            <td>
              <input type="file"></input><br/>
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

export default Registration_vndr
