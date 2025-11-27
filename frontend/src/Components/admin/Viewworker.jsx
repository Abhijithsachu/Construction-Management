import React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Navpage from './Navpage';

function Viewworker() {
  return (
    <div>
      <Navpage></Navpage>
      <div className='d-flex justify-content-between'>
        <div><Link to={'/homepage'}>
       <Button className="float-end mb-2">Back</Button></Link>
       </div>
       <h3 align='center'className='d-inline'>WORKER INFO</h3> 
       <Link to={'/workerregistration'}>
       <Button className="float-end mb-2">+ ADD</Button></Link>
</div>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Accept</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><Button className='btn-success'>Accept</Button></td>
          <td><Button className='btn-danger'>Delete</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td><Button className='btn-success'>Accept</Button></td>
          <td><Button className='btn-danger'>Delete</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>@twitter</td>
          <td>Bird</td>
          <td><Button className='btn-success'>Accept</Button></td>
          <td><Button className='btn-danger'>Delete</Button></td>
        </tr>
      </tbody>
    </Table>

    </div>
  )
}

export default Viewworker
