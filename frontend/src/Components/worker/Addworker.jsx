import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Addworker() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  // 🔹 Dynamic workers array
  const [workers, setWorkers] = useState([
    { name: "", phone: "" },
  ]);

  const navigate = useNavigate();
  const workerId = localStorage.getItem("workerId");

  // 🔹 Fetch accepted projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get(`/project/acceptedproject/${workerId}`);
        setProjects(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [workerId]);

  // 🔹 Handle worker field change
  const handleWorkerChange = (index, field, value) => {
    const updatedWorkers = [...workers];
    updatedWorkers[index][field] = value;
    setWorkers(updatedWorkers);
  };

  // 🔹 Add worker field
  const addWorker = () => {
    setWorkers([...workers, { name: "", phone: "" }]);
  };

  // 🔹 Remove worker field
  const removeWorker = (index) => {
    if (workers.length === 1) return;
    setWorkers(workers.filter((_, i) => i !== index));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProject) {
      alert("Select a project");
      return;
    }

    for (let w of workers) {
      if (!w.name || !w.phone) {
        alert("All worker fields are required");
        return;
      }
    }

    try {
      const res = await api.post("/worker/addstaff", {
        projectId: selectedProject,
        workers, // 👈 array of workers
      });
console.log(res);

      alert(res.data.message || "Workers assigned successfully");

      setWorkers([{ name: "", phone: "" }]);
      setSelectedProject("");
    } catch (error) {
      console.error(error);
      alert("Failed to assign workers");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd')",
      backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    paddingTop: "40px",
    position: "relative",
     
      }}
    >
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontWeight: "bold",
        }}
      >
        ⬅ Back
      </Button>

      <div className="container">
        <h3 className="fw-bold mb-4 text-white text-center">
          👷 Assign Workers to Project
        </h3>

        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow-lg">
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  {/* Project */}
                  <Form.Group className="mb-4">
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      required
                    >
                      <option value="">-- Select Project --</option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.projectname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Workers */}
                  {workers.map((worker, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                      <h6>Worker {index + 1}</h6>

                      <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Worker name"
                          value={worker.name}
                          onChange={(e) =>
                            handleWorkerChange(index, "name", e.target.value)
                          }
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Phone number"
                          value={worker.phone}
                          onChange={(e) =>
                            handleWorkerChange(index, "phone", e.target.value)
                          }
                          required
                        />
                      </Form.Group>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeWorker(index)}
                      >
                        ❌ Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="secondary"
                    className="mb-3"
                    onClick={addWorker}
                  >
                    ➕ Add Another Worker
                  </Button>

                  <div className="d-grid">
                    <Button type="submit" variant="success">
                      ✅ Assign Workers
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addworker;
