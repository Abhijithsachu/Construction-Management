import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import Registration from './Components/user/Registration'
import Registration_wrk from './Components/worker/Registration_wrk'
import Registration_vndr from './Components/vendor/Registration_vndr'
import { Route, Routes } from 'react-router-dom'
import Viewworker from './Components/admin/Viewworker'
import Viewuser from './Components/admin/Viewuser'
import Verifyvendor from './Components/admin/Verifyvendor'
import Homepage from './Components/admin/homepage'
import Userhome from './Components/user/Userhome'
import Vndrhome from './Components/vendor/Vndrhome'
import Wrkhome from './Components/worker/Wrkhome'
import Addprd from './Components/vendor/Addprd'
import Viewproduct from './Components/vendor/Viewproduct'
import Editproduct from './Components/vendor/Editproduct'

import RequestPrdct from './Components/user/RequestPrdct'
import Userreqworker from './Components/user/Userreqworker'
import Sendcomplaint from './Components/user/sendcomplaint'
import Viewworkers from './Components/user/Viewworker'
import Sendfeedback from './Components/user/Sendfeedback'
import Projectdetails from './Components/user/Projectdetails'

import VendorUpdateStatus from './Components/vendor/VendorUpdateStatus'
import VendorViewRequests from './Components/vendor/ViewreqPrdct'
import UserViewProduct from './Components/user/UserViewproduct'
import ViewProject from './Components/worker/viewproject'
import AdminViewprojects from './Components/admin/adminViewprojects'
import Addworker from './Components/worker/Addworker'
import UserProfileCard from './Components/user/UserProfileCard'
import VendorViewComplaint from './Components/vendor/VendorViewFeedback'
import Complaint from './Components/worker/Complaint'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + t</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count - 5)}>
          count  {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <Login/> */}
      {/* <Registration/> */}
      <Routes>
        <Route path='/' element={<Login></Login>}/>
        <Route path='/userregistration' element={<Registration/>}/>
        <Route path='/workerregistration' element={<Registration_wrk/>}/>
        <Route path='/venderregistration' element={<Registration_vndr/>}/>
        <Route path='/adminviewworker' element={<Viewworker/>}/>
        <Route path='/adminviewuser' element={<Viewuser/>}/>
        <Route path='/adminverifyvendor' element={<Verifyvendor/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/userhomepage' element={<Userhome/>}/>
        <Route path='/Vndrhomepage' element={<Vndrhome/>}/> 
        <Route path='/Wrkhomepage' element={<Wrkhome/>}/> 
        <Route path='/addprdpage' element={<Addprd/>}/>
        <Route path='/viewprdt' element={<Viewproduct/>}/>
        <Route path='/editproduct/:id' element={<Editproduct/>}/>
        <Route path='/userviewprdt' element={<UserViewProduct/>}/>
        <Route path='/userreqprdct' element={<RequestPrdct/>}/>
        <Route path='/userreqworker' element={<Userreqworker/>}/>
        <Route path='/sendcomplaint' element={<Sendcomplaint/>}/>
        <Route path='/viewwrkrs' element={<Viewworkers/>}/>
        <Route path='/sendfeedback' element={<Sendfeedback/>}/>
        <Route path='/projectdetails' element={<Projectdetails/>}/>
        <Route path='/viewrequests' element={<VendorViewRequests/>}/>
        <Route path='/VendorUpdateStatus' element={<VendorUpdateStatus/>}/>
        <Route path='/VendorViewComplaint' element={<VendorViewComplaint/>}/>
        <Route path='/projects' element={<ViewProject/>}/>
        <Route path="/viewprojects" element={<AdminViewprojects/>}/>
        <Route path="/addworker" element={<Addworker/>}/>
        <Route path="/UserProfileCard" element={<UserProfileCard/>}/>
        <Route path="/viewwrkercomplaint" element={<Complaint/>}/>
    </Routes>
    </>
  )
}

export default App
