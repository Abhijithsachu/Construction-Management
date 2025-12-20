import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";

function Viewworkers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchAcceptedWorkers();
  }, []);

  const fetchAcceptedWorkers = async () => {
    try {
      const res = await api.get("/worker/accepted"); // accepted workers API
      setWorkers(res.data);
    } catch (error) {
      console.error(error);
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
          ✅ Accepted Workers
        </h2>

        <div className="row g-4">
          {workers.length === 0 ? (
            <p className="text-center text-light">
              No accepted workers found
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

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success fs-6">
                        Accepted
                      </span>
                      <span className="badge bg-secondary">
                        📍 {item.location}
                      </span>
                    </div>

                    <p className="small mb-1">
                      📞 {item.phone}
                    </p>

                    <p className="small text-muted mb-0">
                      ✉️ {item.email}
                    </p>

                    <Button
                      variant="outline-dark"
                      className="mt-auto w-100"
                    >
                      View Profile
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

export default Viewworkers;
