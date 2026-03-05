// import React, { useEffect, useState } from "react";
// import api from "../../api";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import Badge from "react-bootstrap/Badge";
// import Modal from "react-bootstrap/Modal";
// import { useNavigate } from "react-router-dom";

// function Projectdetails() {
//   const navigate = useNavigate();

//   /* ---------------- STATES ---------------- */
//   const [projects, setProjects] = useState([]);

//   // form states
//   const [projectName, setProjectName] = useState("");
//   const [location, setLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const userId = localStorage.getItem("userId");

//   /* ---------------- FETCH PROJECTS ---------------- */
//   const fetchProjects = async () => {
//     try {
//       const res = await api.get(`/project/userproject/${userId}`);
//       setProjects(res.data.data);
//       console.log("Projects:", res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   /* ---------------- ADD PROJECT ---------------- */
//   const handleAddProject = async (e) => {
//     e.preventDefault();
//     try {
//       let re = await api.post("/project/add", {
//         projectName,
//         location,
//         description,
//         startDate,
//         userId,
//       });
//       console.log(re);

//       alert("Project added successfully");
//       fetchProjects();

//       // reset form
//       setProjectName("");
//       setLocation("");
//       setDescription("");
//       setStartDate("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add project");
//     }
//   };

//   /* ---------------- HANDLE PROJECT CLICK ---------------- */
//   const handleProjectClick = (project) => {
//     if (project.status === "accepted") {
//       setSelectedProject(project);
//       setShowModal(true);
//     }
//   };
// console.log(projects);

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         paddingTop: "40px",
//       }}
//     >
//       {/* BACK BUTTON */}
//       <Button
//         variant="light"
//         onClick={() => navigate(-1)}
//         style={{ position: "absolute", top: 20, left: 20 }}
//       >
//         ⬅ Back
//       </Button>

//       <div className="container">
//         <h2 className="text-center fw-bold text-white mb-4">
//           🏗️ Project Management
//         </h2>

//         {/* -------- ADD PROJECT FORM -------- */}
//         <div className="card shadow-lg border-0 mb-4">
//           <div className="card-body">
//             <h5 className="fw-bold mb-3">➕ Add New Project</h5>

//             <Form onSubmit={handleAddProject}>
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <Form.Control
//                     placeholder="Project Name"
//                     value={projectName}
//                     onChange={(e) => setProjectName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <Form.Control
//                     placeholder="Location"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="col-md-12 mb-3">
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <Form.Control
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <Button type="submit" variant="success">
//                 ➕ Add Project
//               </Button>
//             </Form>
//           </div>
//         </div>

//         {/* -------- PROJECT LIST -------- */}
//         <div className="row g-4">
//           {projects.length === 0 ? (
//             <p className="text-center text-light">No projects found</p>
//           ) : (
//             projects.map((project) => (
//               <div className="col-lg-6" key={project._id}>
//                 <div
//                   className="card shadow-lg border-0 h-100"
//                   style={{
//                     cursor: project.status === "accepted" ? "pointer" : "default",
//                   }}
//                   onClick={() => handleProjectClick(project)}
//                 >
//                   <div className="card-body">
//                     <h5 className="fw-bold">{project.projectName}</h5>

//                     <Badge bg="info" className="me-2">
//                       {project.location}
//                     </Badge>
//                     {project.status === "accepted" ? 
//                     <Badge bg="success" className="me-2">
//                       {project.status}
//                     </Badge>:
//                     <Badge className="me-2">
//                       {project.status}
//                     </Badge>}
                    

//                     <p className="text-muted mt-2">{project.description}</p>

//                     <small>Start: {project.startDate}</small>

//                     <div className="mt-3">
//                       <ProgressBar
//                         now={project.progress || 0}
//                         label={`${project.progress || 0}%`}
//                       />
//                     </div>

//                     {/* WORKERS */}
//                     {project.workers?.length > 0 && (
//                       <>
//                         <hr />
//                         <h6 className="fw-bold">👷 Assigned Workers</h6>
//                         <ul className="list-group list-group-flush">
//                           {project.workers.map((w) => (
//                             <li key={w._id} className="list-group-item">
//                               {w.name} – {w.jobrole}
//                             </li>
//                           ))}
//                         </ul>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* ---------------- POPUP MODAL FOR ACCEPTED PROJECTS ---------------- */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>📋 Project Details</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {selectedProject && (
//             <>
//               <p>
//                 <strong>Project:</strong> {selectedProject.projectname}
//               </p>
//               <p>
//                 <strong>Location:</strong> {selectedProject.location}
//               </p>
//               <p>
//                 <strong>Description:</strong> {selectedProject.description}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <Badge bg="success">{selectedProject.status}</Badge>
//               </p>
//               <p>
//                 <strong>Accepted By:</strong> {selectedProject.workerID?.name}
//               </p>

//               <hr />

//               {/* 👷 STAFF DETAILS */}
//               <h6 className="fw-bold">👷 Staff Added</h6>
//               {selectedProject.staff?.length > 0 ? (
//                 <ul className="list-group">
//                   {selectedProject.staff.map((s, index) => (
//                     <li key={index} className="list-group-item">
//                       👤 {s.name} — 📞 {s.phone}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted">No staff added yet</p>
//               )}
//             </>
//           )}
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Projectdetails;
// import React, { useEffect, useState } from "react";
// import api from "../../api";
// import { Button, Form, Badge, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function Projectdetails() {
//   const navigate = useNavigate();

//   /* ---------------- STATES ---------------- */
//   const [projects, setProjects] = useState([]);
//   const [projectComplaints, setProjectComplaints] = useState([]);
  
//   // Add project modal
//   const [showAddModal, setShowAddModal] = useState(false);

//   // Project details modal
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   // Add project form states
//   const [projectName, setProjectName] = useState("");
//   const [location, setLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");

//   const userId = localStorage.getItem("userId");

//   /* ---------------- FETCH PROJECTS ---------------- */
//   const fetchProjects = async () => {
//     try {
//       const res = await api.get(`/project/userproject/${userId}`);
//       setProjects(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   /* ---------------- ADD PROJECT ---------------- */
//   const handleAddProject = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/project/add", {
//         projectName,
//         location,
//         description,
//         startDate,
//         userId,
//       });

//       alert("Project added successfully");
//       fetchProjects();

//       // Reset form
//       setProjectName("");
//       setLocation("");
//       setDescription("");
//       setStartDate("");
//       setShowAddModal(false);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add project");
//     }
//   };

//   /* ---------------- HANDLE PROJECT CLICK ---------------- */
//   const handleProjectClick = async (project) => {
//     setSelectedProject(project);
//     setShowDetailsModal(true);

//     // Fetch complaints for this project
//     try {
//       const res = await api.get(`/complaint/project/${project._id}`);
//       setProjectComplaints(res.data.complaints);
//     } catch (err) {
//       console.error(err);
//       setProjectComplaints([]);
//     }
//   };

//   /* ---------------- SEND COMPLAINT ---------------- */
//   const handleSendComplaint = async (projectId, workerId) => {
//     const issueDescription = prompt("Enter your complaint about the worker:");
//     if (!issueDescription) return;

//     try {
//       await api.post(`/complaint/worker/${workerId}`, {
//         userId,
//         projectId,
//         issueDescription,
//       });
//       alert("Complaint sent successfully");

//       // Refresh complaints for this project
//       const res = await api.get(`/complaint/project/${projectId}`);
//       setProjectComplaints(res.data.complaints);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send complaint");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         paddingTop: "40px",
//       }}
//     >
//       {/* BACK BUTTON */}
//       <Button
//         variant="light"
//         onClick={() => navigate(-1)}
//         style={{ position: "absolute", top: 20, left: 20 }}
//       >
//         ⬅ Back
//       </Button>

//       {/* ADD PROJECT BUTTON */}
//       <Button
//         variant="success"
//         onClick={() => setShowAddModal(true)}
//         style={{ position: "absolute", top: 20, right: 20 }}
//       >
//         ➕ Add Project
//       </Button>

//       <div className="container">
//         <h2 className="text-center fw-bold text-white mb-4">
//           🏗️ Project Management
//         </h2>

//         {/* -------- PROJECT LIST -------- */}
//         <div className="row g-4">
//           {projects.length === 0 ? (
//             <p className="text-center text-light">No projects found</p>
//           ) : (
//             projects.map((project) => (
//               <div className="col-lg-6" key={project._id}>
//                 <div
//                   className="card shadow-lg border-0 h-100"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleProjectClick(project)}
//                 >
//                   <div className="card-body">
//                     <h5 className="fw-bold">{project.projectname}</h5>

//                     <Badge bg="info" className="me-2">
//                       {project.location}
//                     </Badge>
//                     <Badge
//                       bg={project.status === "accepted" ? "success" : "secondary"}
//                       className="me-2"
//                     >
//                       {project.status}
//                     </Badge>

//                     <p className="text-muted mt-2">{project.description}</p>

//                     <small>Start: {project.startDate}</small>

//                     {/* WORKER & COMPLAINT */}
//                     {project.workerID ? (
//                       <>
//                         <hr />
//                         <h6 className="fw-bold">👷 Assigned Worker</h6>
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span>
//                             {project.workerID.name} – {project.workerID.jobrole || "Worker"}
//                           </span>
//                           <Button
//                             size="sm"
//                             variant="danger"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleSendComplaint(project._id, project.workerID._id);
//                             }}
//                           >
//                             📝 Complaint
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="text-muted mt-2">No worker assigned yet</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* ---------------- ADD PROJECT MODAL ---------------- */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>➕ Add New Project</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleAddProject}>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 placeholder="Project Name"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 placeholder="Location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" variant="success">
//               Add Project
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* ---------------- PROJECT DETAILS MODAL ---------------- */}
//       <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>📋 Project Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedProject && (
//             <>
//               <p><strong>Project:</strong> {selectedProject.projectname}</p>
//               <p><strong>Location:</strong> {selectedProject.location}</p>
//               <p><strong>Description:</strong> {selectedProject.description}</p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <Badge
//                   bg={selectedProject.status === "accepted" ? "success" : "secondary"}
//                 >
//                   {selectedProject.status}
//                 </Badge>
//               </p>

//               {/* WORKER */}
//               {selectedProject.workerID ? (
//                 <>
//                   <hr />
//                   <h6 className="fw-bold">👷 Assigned Worker</h6>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span>
//                       {selectedProject.workerID.name} – {selectedProject.workerID.jobrole || "Worker"}
//                     </span>
//                     <Button
//                       size="sm"
//                       variant="danger"
//                       onClick={() => handleSendComplaint(selectedProject._id, selectedProject.workerID._id)}
//                     >
//                       📝 Complaint
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-muted mt-2">No worker assigned yet</p>
//               )}

//               {/* STAFF */}
//               {selectedProject.staff?.length > 0 && (
//                 <>
//                   <hr />
//                   <h6 className="fw-bold">👥 Staff Added</h6>
//                   <ul className="list-group">
//                     {selectedProject.staff.map((s, idx) => (
//                       <li key={idx} className="list-group-item">
//                         👤 {s.name} — 📞 {s.phone}
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}

//               {/* COMPLAINTS */}
//               {projectComplaints?.length > 0 && (
//                 <>
//                   <hr />
//                   <h6 className="fw-bold">📝 Complaints</h6>
//                   <ul className="list-group">
//                     {projectComplaints.map((c, idx) => (
//                       <li key={idx} className="list-group-item">
//                         <strong>issue:</strong> {c.issueDescription} <br />
//                         <strong>Reply:</strong> {c.reply} <br />

//                         <small>About: {c.workerId.name}</small>
                        
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Projectdetails;

import React, { useEffect, useState } from "react";
import api from "../../api";
import { Button, Form, Badge, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Projectdetails() {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projectComplaints, setProjectComplaints] = useState([]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");

  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected

  const userId = localStorage.getItem("userId");

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = async () => {
    try {
      const res = await api.get(`/project/userproject/${userId}`);
      setProjects(res.data.data);
      setFilteredProjects(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ---------------- FILTER PROJECTS ---------------- */
  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === filter));
    }
  }, [filter, projects]);

  /* ---------------- ADD PROJECT ---------------- */
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/project/add", {
        projectName,
        location,
        description,
        startDate,
        userId,
      });

      alert("Project added successfully");
      fetchProjects();

      setProjectName("");
      setLocation("");
      setDescription("");
      setStartDate("");
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    }
  };

  /* ---------------- HANDLE PROJECT CLICK ---------------- */
  const handleProjectClick = async (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);

    try {
      const res = await api.get(`/complaint/project/${project._id}`);
      setProjectComplaints(res.data.complaints || []);
    } catch (err) {
      console.error(err);
      setProjectComplaints([]);
    }
  };

  /* ---------------- SEND COMPLAINT ---------------- */
  const handleSendComplaint = async (projectId, workerId) => {
    const issueDescription = prompt("Enter your complaint about the worker:");
    if (!issueDescription) return;

    try {
      await api.post(`/complaint/worker/${workerId}`, {
        userId,
        projectId,
        issueDescription,
      });
      alert("Complaint sent successfully");

      const res = await api.get(`/complaint/project/${projectId}`);
      setProjectComplaints(res.data.complaints || []);
    } catch (err) {
      console.error(err);
      alert("Failed to send complaint");
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
      {/* BACK BUTTON */}
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        ⬅ Back
      </Button>

      {/* ADD PROJECT BUTTON */}
      <Button
        variant="success"
        onClick={() => setShowAddModal(true)}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        ➕ Add Project
      </Button>

      <div className="container">
        <h2 className="text-center fw-bold text-white mb-3">
          🏗️ Project Management
        </h2>

        {/* FILTER BUTTONS */}
        <div className="text-center mb-4">
          {["all", "pending", "accepted", "rejected"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "primary" : "outline-light"}
              className="me-2 mb-2"
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* PROJECT LIST */}
        <div className="row g-4">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-light">No projects found</p>
          ) : (
            filteredProjects.map((project) => (
              <div className="col-lg-6" key={project._id}>
                <div
                  className="card shadow-lg border-0 h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="card-body">
                    <h5 className="fw-bold">{project.projectname}</h5>
                    <Badge bg="info" className="me-2">{project.location}</Badge>
                    <Badge
                      bg={project.status === "accepted" ? "success" : project.status === "rejected" ? "danger" : "secondary"}
                      className="me-2"
                    >
                      {project.status}
                    </Badge>

                    <p className="text-muted mt-2">{project.description}</p>
                    <small>Start: {project.date}</small>

                    {/* WORKER & COMPLAINT */}
                    {project.workerID || project.status === "accepted" ? (
                      <div className="mt-2 d-flex justify-content-between align-items-center">
                        <span>
                          {project.workerID.name} – {project.workerID.jobrole || "Worker"}
                        </span>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={project.status !== "accepted"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendComplaint(project._id, project.workerID._id);
                          }}
                        >
                          📝 Complaint
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted mt-2">No worker assigned yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ADD PROJECT MODAL */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>➕ Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProject}>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success">Add Project</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* PROJECT DETAILS MODAL */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📋 Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <>
              <p><strong>Project:</strong> {selectedProject.projectname}</p>
              <p><strong>Location:</strong> {selectedProject.location}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  bg={selectedProject.status === "accepted" ? "success" : selectedProject.status === "rejected" ? "danger" : "secondary"}
                >
                  {selectedProject.status}
                </Badge>
              </p>

              {selectedProject.workerID ? (
                <>
                  <hr />
                  <h6 className="fw-bold">👷 Assigned Worker</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {selectedProject.workerID.name} – {selectedProject.workerID.jobrole || "Worker"}
                    </span>
                    <Button
                      size="sm"
                      variant="danger"
                    disabled={selectedProject.status !== "accepted"}

                      onClick={() => handleSendComplaint(selectedProject._id, selectedProject.workerID._id)}
                    >
                      📝 Complaint
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-muted mt-2">No worker assigned yet</p>
              )}

              {selectedProject.staff?.length > 0 && (
                <>
                  <hr />
                  <h6 className="fw-bold">👥 Staff Added</h6>
                  <ul className="list-group">
                    {selectedProject.staff.map((s, idx) => (
                      <li key={idx} className="list-group-item">
                        👤 {s.name} — 📞 {s.phone}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {projectComplaints?.length > 0 && (
                <>
                  <hr />
                  <h6 className="fw-bold">📝 Complaints</h6>
                  <ul className="list-group">
                    {projectComplaints.map((c, idx) => (
                      <li key={idx} className="list-group-item">
                        <strong>Issue:</strong> {c.issueDescription} <br />
                        <strong>Reply:</strong> {c.reply || "No reply yet"} <br />
                        <small>About: {c.workerId.name}</small>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Projectdetails;