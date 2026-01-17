// import React, { useEffect, useState } from "react";
// import api from "../../api";
// import Button from "react-bootstrap/Button";
// import Badge from "react-bootstrap/Badge";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import { useNavigate } from "react-router-dom";

// function RequestPrdct() {
//   const [products, setProducts] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("All");

//   // Rating
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [review, setReview] = useState("");

//   // Complaint
//   const [showComplaintModal, setShowComplaintModal] = useState(false);
//   const [complaintTitle, setComplaintTitle] = useState("");
//   const [complaintDescription, setComplaintDescription] = useState("");
//   const [complaintType, setComplaintType] = useState("Other");

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await api.get(`/productbooking/details/${userId}`);
//       console.log(res);
      
//       setProducts(res.data.booking);
//       console.log(res);
      
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // CANCEL BOOKING
//   const handleCancel = async (bookingId) => {
//     try {
//       await api.put(`/productbooking/cancel/${bookingId}`);
//       alert("Booking cancelled ❌");
//       fetchProducts();
//     } catch (error) {
//       alert("Only pending bookings can be cancelled");
//     }
//   };

//   // OPEN RATING
//   const handleOpenRating = (item) => {
//     setSelectedProduct(item);
//     setRating(5);
//     setReview("");
//     setShowRatingModal(true);
//   };

//   // SUBMIT RATING
//   const handleSubmitRating = async () => {
//     if (!selectedProduct) return;
//     try {
//       await api.post(`/product/rate/${selectedProduct.productId._id}`, {
//         userId,
//         rating,
//         review,
//       });
//       alert("Thank you for your feedback ⭐");
//       setShowRatingModal(false);
//       fetchProducts();
//     } catch (error) {
//       alert("Failed to submit rating");
//     }
//   };

//   // OPEN COMPLAINT
//   const handleOpenComplaint = (item) => {
//     setSelectedProduct(item);
//     setComplaintTitle("");
//     setComplaintDescription("");
//     setComplaintType("Other");
//     setShowComplaintModal(true);
//   };

//   // SUBMIT COMPLAINT
//   const handleSubmitComplaint = async () => {
//     if (!selectedProduct) return;
//     console.log(selectedProduct);
    
//     try {
//    let res=   await api.post(`/complaint/${selectedProduct.productId._id}`, {
//         userId,
//         issueTitle: complaintTitle,
//         issueDescription: complaintDescription,
//         issueType: complaintType,
//       });
//       console.log(res);
      
//       alert("Complaint submitted ⚠️");
//       setShowComplaintModal(false);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to submit complaint");
//     }
//   };

//   // STATUS BADGE
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "pending":
//         return <Badge bg="warning">Pending</Badge>;
//       case "Approved":
//         return <Badge bg="primary">Approved</Badge>;
//       case "Shipped":
//         return <Badge bg="info">Shipped</Badge>;
//       case "Delivered":
//         return <Badge bg="success">Delivered</Badge>;
//       case "Cancelled":
//         return <Badge bg="danger">Cancelled</Badge>;
//       default:
//         return <Badge bg="secondary">{status}</Badge>;
//     }
//   };

//   const filteredProducts =
//     filterStatus === "All"
//       ? products
//       : products.filter((item) => item.status === filterStatus);

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
//         backgroundSize: "cover",
//         minHeight: "100vh",
//         paddingTop: "40px",
//       }}
//     >
//       <Button
//         variant="light"
//         onClick={() => navigate(-1)}
//         style={{ position: "absolute", top: 20, left: 20 }}
//       >
//         ⬅ Back
//       </Button>

//       <div className="container">
//         <h2 className="text-center text-white fw-bold mb-4">
//           📦 My Requested Products
//         </h2>

//         <div className="d-flex justify-content-end mb-4">
//           <select
//             className="form-select w-auto"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="pending">Pending</option>
//             <option value="Approved">Approved</option>
//             <option value="Shipped">Shipped</option>
//             <option value="Delivered">Delivered</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>

//         <div className="row g-4">
//           {filteredProducts.length === 0 ? (
//             <p className="text-center text-light">No bookings found</p>
//           ) : (
//             [...filteredProducts].reverse().map((item) => (
//               <div className="col-lg-4 col-md-6" key={item._id}>
//                 <div className="card h-100 shadow border-0">
//                   <img
//                     src={`http://localhost:8000/${item.productId?.Photo}`}
//                     className="card-img-top"
//                     style={{ height: 220, objectFit: "cover" }}
//                     alt=""
//                   />

//                   <div className="card-body d-flex flex-column">
//                     <h5>{item.productId?.productname}</h5>
//                     <p className="text-muted small">{item.productId?.Description}</p>

//                     <div className="mb-2">Status: {getStatusBadge(item.status)}</div>

//                     <div className="d-flex justify-content-between mb-3">
//                       <Badge bg="success">₹ {item.productId?.price}</Badge>
//                       <strong>₹ {item.totalamount}</strong>
//                     </div>

//                     <Badge bg="secondary" className="mb-3">
//                       Quantity: {item.quantity}
//                     </Badge>

//                     {/* PENDING */}
//                     {item.status === "pending" && (
//                       <Button
//                         variant="outline-danger"
//                         onClick={() => handleCancel(item._id)}
//                         className="mt-auto"
//                       >
//                         Cancel Booking
//                       </Button>
//                     )}

//                     {/* DELIVERED */}
//                     {item.status === "Delivered" && (
//                       <div className="d-flex gap-2 mt-auto">
//                         <Button
//                           variant="outline-success"
//                           onClick={() => handleOpenRating(item)}
//                         >
//                           ⭐ Rate
//                         </Button>
//                         <Button
//                           variant="outline-warning"
//                           onClick={() => handleOpenComplaint(item)}
//                         >
//                           ⚠️ Complaint
//                         </Button>
//                       </div>
//                     )}

//                     {/* CANCELLED */}
//                     {item.status === "Cancelled" && (
//                       <Button variant="secondary" disabled className="mt-auto">
//                         ❌ Cancelled
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* RATING MODAL */}
//       <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Rate Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Select
//               className="mb-3"
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//             >
//               <option value={5}>5 - Excellent</option>
//               <option value={4}>4 - Good</option>
//               <option value={3}>3 - Average</option>
//               <option value={2}>2 - Poor</option>
//               <option value={1}>1 - Bad</option>
//             </Form.Select>

//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Write review"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//             />

//             <Button className="mt-3 w-100" onClick={handleSubmitRating}>
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* COMPLAINT MODAL */}
//       <Modal
//         show={showComplaintModal}
//         onHide={() => setShowComplaintModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Raise Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Issue Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter a short title"
//                 value={complaintTitle}
//                 onChange={(e) => setComplaintTitle(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Issue Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 placeholder="Describe your issue in detail"
//                 value={complaintDescription}
//                 onChange={(e) => setComplaintDescription(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Issue Type</Form.Label>
//               <Form.Select
//                 value={complaintType}
//                 onChange={(e) => setComplaintType(e.target.value)}
//               >
//                 <option value="Quality">Quality</option>
//                 <option value="Delivery">Delivery</option>
//                 <option value="Payment">Payment</option>
//                 <option value="Other">Other</option>
//               </Form.Select>
//             </Form.Group>

//             <Button
//               variant="warning"
//               className="mt-3 w-100"
//               onClick={handleSubmitComplaint}
//             >
//               Submit Complaint
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default RequestPrdct;
import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function RequestPrdct() {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  // Rating Modal
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  // Complaint Modals
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Complaint form fields
  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [complaintType, setComplaintType] = useState("Other");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  // FETCH BOOKINGS + ATTACH COMPLAINTS
  const fetchBookings = async () => {
    try {
      const res = await api.get(`/productbooking/details/${userId}`);
      const bookingsData = res.data.booking;

      const complaintsRes = await api.get(`/complaint/user/${userId}`);
      const userComplaints = complaintsRes.data.complaints;

      const bookingsWithComplaints = bookingsData.map((b) => {
        const complaint = userComplaints.find(
          (c) => c.productId?._id === b.productId?._id
        );
        return { ...b, complaint };
      });

      setBookings(bookingsWithComplaints);
    } catch (error) {
      console.error(error);
    }
  };

  // CANCEL BOOKING
  const handleCancel = async (bookingId) => {
    try {
      await api.put(`/productbooking/cancel/${bookingId}`);
      alert("Booking cancelled ❌");
      fetchBookings();
    } catch (error) {
      alert("Only pending bookings can be cancelled");
    }
  };

  // OPEN RATING
  const handleOpenRating = (booking) => {
    setSelectedBooking(booking);
    setRating(5);
    setReview("");
    setShowRatingModal(true);
  };

  // SUBMIT RATING
  const handleSubmitRating = async () => {
    if (!selectedBooking) return;
    try {
      await api.post(`/product/rate/${selectedBooking.productId._id}`, {
        userId,
        rating,
        review,
      });
      alert("Thank you for your feedback ⭐");
      setShowRatingModal(false);
      fetchBookings();
    } catch (error) {
      alert("Failed to submit rating");
    }
  };

  // OPEN COMPLAINT MODAL
  const handleOpenComplaint = (booking) => {
    setSelectedBooking(booking);
    setComplaintTitle("");
    setComplaintDescription("");
    setComplaintType("Other");
    setShowComplaintModal(true);
  };

  // SUBMIT COMPLAINT
  const handleSubmitComplaint = async () => {
    if (!selectedBooking) return;
    try {
      await api.post(`/complaint/${selectedBooking.productId._id}`, {
        userId,
        issueTitle: complaintTitle,
        issueDescription: complaintDescription,
        issueType: complaintType,
      });
      alert("Complaint submitted ⚠️");
      setShowComplaintModal(false);
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to submit complaint");
    }
  };

  // VIEW COMPLAINT REPLY
  const handleViewReply = (complaint) => {
    setSelectedComplaint(complaint);
    setShowReplyModal(true);
  };

  // STATUS BADGE
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "Approved":
        return <Badge bg="primary">Approved</Badge>;
      case "Shipped":
        return <Badge bg="info">Shipped</Badge>;
      case "Delivered":
        return <Badge bg="success">Delivered</Badge>;
      case "Cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const filteredBookings =
    filterStatus === "All"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Button
        variant="light"
        onClick={() => navigate(-1)}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        ⬅ Back
      </Button>

      <div className="container">
        <h2 className="text-center text-white fw-bold mb-4">
          📦 My Bookings
        </h2>

        <div className="d-flex justify-content-end mb-4">
          <select
            className="form-select w-auto"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="row g-4">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-light">No bookings found</p>
          ) : (
            [...filteredBookings].reverse().map((b) => (
              <div className="col-lg-4 col-md-6" key={b._id}>
                <div className="card h-100 shadow border-0">
                  <img
                    src={`http://localhost:8000/${b.productId?.Photo}`}
                    className="card-img-top"
                    style={{ height: 220, objectFit: "cover" }}
                    alt={b.productId?.productname}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5>{b.productId?.productname}</h5>
                    <p className="text-muted small">{b.productId?.Description}</p>

                    <div className="mb-2">Status: {getStatusBadge(b.status)}</div>

                    <div className="d-flex justify-content-between mb-3">
                      <Badge bg="success">₹ {b.productId?.price}</Badge>
                      <strong>₹ {b.totalamount}</strong>
                    </div>

                    <Badge bg="secondary" className="mb-3">
                      Quantity: {b.quantity}
                    </Badge>

                    {/* PENDING */}
                    {b.status !== "Delivered" && (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCancel(b._id)}
                        className="mt-auto"
                          disabled={b.status !== "pending"} 
                      >
                        Cancel Booking
                      </Button>
                    )}

                    {/* DELIVERED */}
                    {b.status === "Delivered" && (
                      <div className="d-flex flex-column gap-2 mt-auto">
                        <Button
                          variant="outline-success"
                          onClick={() => handleOpenRating(b)}
                        >
                          ⭐ Rate
                        </Button>

                        {!b.complaint && (
                          <Button
                            variant="outline-warning"
                            onClick={() => handleOpenComplaint(b)}
                          >
                            ⚠️ Raise Complaint
                          </Button>
                        )}

                        {b.complaint && (
                          <Button
                            variant="outline-primary"
                            onClick={() => handleViewReply(b.complaint)}
                          >
                            💬 View Complaint Reply
                          </Button>
                        )}
                      </div>
                    )}

                    {/* CANCELLED */}
                    {b.status === "Cancelled" && (
                      <Button variant="secondary" disabled className="mt-auto">
                        ❌ Cancelled
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RATING MODAL */}
      <Modal
        show={showRatingModal}
        onHide={() => setShowRatingModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select
              className="mb-3"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Bad</option>
            </Form.Select>

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <Button className="mt-3 w-100" onClick={handleSubmitRating}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* COMPLAINT MODAL */}
      <Modal
        show={showComplaintModal}
        onHide={() => setShowComplaintModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Raise Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a short title"
                value={complaintTitle}
                onChange={(e) => setComplaintTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe your issue"
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Issue Type</Form.Label>
              <Form.Select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
              >
                <option value="Quality">Quality</option>
                <option value="Delivery">Delivery</option>
                <option value="Payment">Payment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="warning"
              className="mt-3 w-100"
              onClick={handleSubmitComplaint}
            >
              Submit Complaint
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* COMPLAINT REPLY MODAL */}
      <Modal
        show={showReplyModal}
        onHide={() => setShowReplyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Complaint Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComplaint ? (
            <>
              <p>
                <strong>Issue Title:</strong> {selectedComplaint.issueTitle}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedComplaint.issueDescription}
              </p>
              <p>
                <strong>Type:</strong>{" "}
                <Badge bg="secondary">{selectedComplaint.issueType}</Badge>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge bg={selectedComplaint.reply ? "success" : "warning"}>
                  {selectedComplaint.reply ? "Replied" : "Pending"}
                </Badge>
              </p>
              <hr />
              <p>
                <strong>Reply:</strong>
              </p>
              <div className="p-3 bg-light rounded border">
                {selectedComplaint.reply || "No reply yet"}
              </div>
            </>
          ) : (
            <p>No complaint selected.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RequestPrdct;
