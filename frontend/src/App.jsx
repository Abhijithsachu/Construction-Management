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
        <Route path='/workerregistration' element={<Registration_wrk/>}/>
        <Route path='/venderregistration' element={<Registration_vndr/>}/>
        <Route path='/adminviewworker' element={<Viewworker/>}/>
        <Route path='/adminviewuser' element={<Viewuser/>}/>
        <Route path='/adminverifyvendor' element={<Verifyvendor/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
      </Routes>
    </>
  )
}

export default App
