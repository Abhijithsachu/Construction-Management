import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Navpage from './Navpage';
import api from '../../api';

function Viewworker() {
  const [workers, setWorkers] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await api.get("/worker/all");
      setWorkers(res.data.workerDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <Navpage />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <Link to="/homepage">
          <Button>Back</Button>
        </Link>

        <h3>WORKER INFO</h3>

        <Link to="/workerregistration">
          <Button>+ ADD</Button>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Job Role</th>
            <th>Email</th>
            <th>PhoneNo</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker, index) => (
            <tr key={worker._id}>
              <td>{index + 1}</td>
              <td>{worker.name}</td>
              <td>{worker.jobrole}</td>
              <td>{worker.email}</td>
              <td>{worker.phoneNo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


export default Viewworker
