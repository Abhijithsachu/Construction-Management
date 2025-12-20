import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";

function ViewWorkers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/workers"); // GET all workers
      setWorkers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestWorker = async (id) => {
    try {
      const res = await api.post("/worker/request", {
        workerId: id,
      });
      alert(res.data.message || "Worker requested successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to request worker");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold text-white mb-4">
          👷 Available Workers
        </h2>

        <div className="row g-4">
          {workers.length === 0 ? (
            <p className="text-center text-light">
              No workers found
            </p>
          ) : (
            workers.map((item) => (
              <div className="col-lg-4 col-md-6" key={item._id}>
                <div className="card h-100 shadow-lg border-0">

                  {/* Worker Image */}
                  <img
                    src={`http://localhost:8000/${item.photo}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">
                      {item.name}
                    </h5>

                    <p className="card-text text-muted small">
                      {item.jobRole}
                    </p>

                    <div className="mb-2">
                      <span className="badge bg-dark me-2">
                        📍 {item.location}
                      </span>
                    </div>

                    <p className="small mb-1">
                      📞 {item.phone}
                    </p>

                    <p className="small text-muted">
                      ✉️ {item.email}
                    </p>

                    <Button
                      variant="warning"
                      className="mt-auto w-100 fw-bold"
                      onClick={() => handleRequestWorker(item._id)}
                    >
                      🚀 Request Worker
                    </Button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewWorkers;
