import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function AdminViewprojects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const res = await api.get("/project/adminviewproject");
      console.log(res);
      setProjects(res.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div
      className="container-fluid min-vh-100 p-4"
      style={{
        backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
          backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Back Button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <h3 className="fw-bold text-white mb-4">Projects</h3>

      {projects.length === 0 ? (
        <p className="text-light">No projects found</p>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div key={project._id} className="col-md-6 mb-4">
              <div className="card bg-light shadow rounded h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.projectname}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    By: {project.userid.name} | Phone: {project.userid.phoneNo} | Email: {project.userid.email}
                  </h6>

                  <p className="card-text">
                    <strong>Project Description:</strong> {project.description}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {project.location}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {project.status}
                  </p>

                  {project.workerID ? (
                    <div className="mt-3">
                      <p className="fw-semibold text-success mb-1">Accepted Worker</p>
                      <p className="mb-1"><strong>Name:</strong> {project.workerID.name}</p>
                      <p className="mb-1"><strong>Contact:</strong> {project.workerID.phoneNo}</p>
                      <p className="mb-0"><strong>Role:</strong> {project.workerID.jobrole}</p>
                    </div>
                  ) : (
                    <p className="text-danger fw-semibold mt-3">No worker assigned</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminViewprojects;
