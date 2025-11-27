import  React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Navpage from './Navpage';

function Viewuser() {
  return (
    <div >
      <Navpage></Navpage>
        <h3 align='center'>USER INFO</h3>
        <Link to={'/workerregistration'}>
        <Button className="float-end mb-2">+ ADD</Button></Link>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>accept</th>
            <th>reject</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><Button className='btn-success'>accept</Button></td>
          <td><Button className='btn-danger'>reject</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
            <td><Button className='btn-success'>accept</Button></td>
          <td><Button className='btn-danger'>reject</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td >Larry the Bird</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
          <td><Button className='btn-success'>accept</Button></td>
          <td><Button  className='btn-danger'>reject</Button></td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}

export default Viewuser
