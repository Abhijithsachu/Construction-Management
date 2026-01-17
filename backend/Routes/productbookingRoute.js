import express from "express";
import {
  cancelBooking,
  productbooking,
  reqproductbooked,
  vendorViewbooking,
  updateBookingStatus
} from "../Controllers/productbookingController.js";

const bookingroute = express.Router();

bookingroute.post("/add", productbooking);
bookingroute.get("/details/:Id", reqproductbooked);
bookingroute.put("/cancel/:bookingId", cancelBooking);
bookingroute.get("/viewbooking/:Id", vendorViewbooking);
bookingroute.put("/updatestatus/:bookingId", updateBookingStatus);

export default bookingroute;
