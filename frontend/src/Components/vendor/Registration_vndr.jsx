import React from 'react'
import './Registration_vndr.css'
function Registration_vndr() {
  return (
    <div className='vndrpage'>
      <form className="vndrform">
        <h1 className='vndrheading'>Registration</h1>

        <table>
          <tr>
            <td><label className="CompanyName">Company Name</label></td>
            <td><input type="text" /></td>
          </tr>

          <tr>
            <td><label className="Email">Email</label></td>
            <td><input type="email" /></td>
          </tr>

          <tr>
            <td><label className="phoneNo">Phone No</label></td>
            <td><input type="tel" /></td>
          </tr>

          <tr>
            <td><label className="Location">Location</label></td>
            <td><input type="text" /></td>
          </tr>

          <tr>
            <td><label className="CompanyLogo">Company Logo</label></td>
            <td><input type="file" /></td>
          </tr>

          <tr>
            <td><label className="password">Password</label></td>
            <td><input type="password" /></td>
          </tr>

          <tr>
            <td><label className="confirmpassword">Confirm Password</label></td>
            <td><input type="password" /></td>
          </tr>
        </table>

        <button className="submitBtn">Register</button>
      </form>
    </div>
  )
}

export default Registration_vndr
