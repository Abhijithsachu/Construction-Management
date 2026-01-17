    import Complaint from "../Models/Complaint.js";

    // import Vendor from "../Models/Vendor.js"; // Make sure this exists

    // ========================
    // 1️⃣ CREATE COMPLAINT (User)
    // POST /complaint/:productId
    // ========================
    export const createComplaint = async (req, res) => {
    try {
        console.log(req.body);
        
        const { userId, issueTitle, issueDescription, issueType } = req.body;
        const { productId } = req.params;
        console.log(productId);
        

        if (!issueTitle || !issueDescription) {
        return res.status(400).json({ message: "Title and description are required" });
        }

        const complaint = new Complaint({
        userId,
        productId,
        issueTitle,
        issueDescription,
        issueType,
        });

        await complaint.save();
        res.status(201).json({ message: "Complaint submitted", complaint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    };

    // ========================
    // 2️⃣ GET USER COMPLAINTS
    // GET /complaint/user/:userId
    // ========================
    export const getUserComplaints = async (req, res) => {
    try {
        const { userId } = req.params;
        const complaints = await Complaint.find({ userId })
        .populate("productId", "productname Photo price")
        .sort({ createdAt: -1 });

        res.status(200).json({ complaints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    };

    // ========================
    // 3️⃣ GET VENDOR COMPLAINTS
    // GET /complaint/vendor/:vendorId
    // ========================
    export const getVendorComplaints = async (req, res) => {
    try {
        const { vendorId } = req.params;

        const complaints = await Complaint.find()
        .populate({
            path: "productId",
            select: "productname Photo price Vendorid",
        })
        .populate("userId")
        .sort({ createdAt: -1 });
    console.log(complaints);
    console.log(vendorId,'kkkkkkkk');

        const vendorComplaints = complaints.filter(
        (c) => c.productId && c.productId.Vendorid.toString() === vendorId
        );
    console.log(vendorComplaints,'lllllllll');

        res.status(200).json({ complaints: vendorComplaints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    };

    // ========================
    // 4️⃣ GET ALL COMPLAINTS (Admin)
    // GET /complaint/admin/all
    // ========================
    export const getAllComplaintsForAdmin = async (req, res) => {
    try {
        const complaints = await Complaint.find()
        .populate({
            path: "productId",
            select: "productname Photo price Vendorid",
            populate: { path: "Vendorid", select: "name email" },
        })
        .populate("userId", "fullname email")
        .sort({ createdAt: -1 });

        res.status(200).json({ complaints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    };

    // ========================
    // 5️⃣ UPDATE COMPLAINT STATUS (Optional)
    // PUT /complaint/status/:complaintId
    // ========================
    export const updateComplaintStatus = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { reply } = req.body;

    console.log(complaintId,reply);
    

        const complaint = await Complaint.findById(complaintId);
        if (!complaint) return res.status(404).json({ message: "Complaint not found" });

        complaint.reply = reply;
        
        await complaint.save();

        res.status(200).json({ message: "Complaint status updated", complaint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    };

// ========================
// CREATE WORKER COMPLAINT
// POST /complaint/worker/:workerId
// ========================
export const createWorkerComplaint = async (req, res) => {
  try {
    const { workerId } = req.params;
    console.log(workerId,req.body);
    
    const { userId, issueTitle, issueDescription, issueType } = req.body;


    const complaint = new Complaint({
      userId,
      workerId,
      
      issueDescription,

    });

    await complaint.save();

    res.status(200).json({
      message: "Worker complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ========================
// GET WORKER COMPLAINTS
// GET /complaint/worker/:workerId
// ========================
export const getWorkerComplaints = async (req, res) => {
  try {
    const { workerId } = req.params;
    console.log(workerId);
    

    const complaints = await Complaint.find({ workerId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json({ complaints });
    console.log(complaints,"hh");
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ========================
// GET ALL WORKER COMPLAINTS (Admin)
// ========================
export const getAllWorkerComplaintsForAdmin = async (req, res) => {
  try {
    const complaints = await Complaint.find({ workerId: { $ne: null } })
      .populate("workerId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
