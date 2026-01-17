import express from "express";
import {
  createComplaint,
  getUserComplaints,
  getVendorComplaints,
  getAllComplaintsForAdmin,
  updateComplaintStatus,
  createWorkerComplaint,
  getWorkerComplaints,
  getAllWorkerComplaintsForAdmin,
} from "../Controllers/complaintController.js";

const router = express.Router();

// 1️⃣ User creates a complaint
router.post("/:productId", createComplaint);

// 2️⃣ User views their complaints
router.get("/user/:userId", getUserComplaints);

// 3️⃣ Vendor views complaints for their products
router.get("/vendor/:vendorId", getVendorComplaints);

// 4️⃣ Admin views all complaints
router.get("/admin/all", getAllComplaintsForAdmin);

// 5️⃣ Update complaint status (admin/vendor)
router.put("/status/:complaintId", updateComplaintStatus);

router.post("/worker/:workerId", createWorkerComplaint);
router.get("/workers/:workerId", getWorkerComplaints);
router.get("/admin", getAllWorkerComplaintsForAdmin);

export default router;
