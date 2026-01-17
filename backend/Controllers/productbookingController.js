import bookingData from "../Models/Booking.js"
import UserData from "../Models/User.js"
import VENDOR from "../Models/Venndor.js"



export const productbooking=async(req,res)=>{
     console.log(req.body)
     const{userId,productId,quantity,totalPrice,address,status}=req.body
     try{
        const booking= new bookingData({
            userId,
            productId,
            quantity,
            totalamount:totalPrice,
            address
        })
        await booking.save()
        return res.status(200).json({message:"save success"})
     }
     catch(e){
        console.log(e)
        return res.status(500).json({message:"server side error"})
     }
}




export const reqproductbooked = async (req, res) => {
  const { Id } = req.params;
console.log(Id,'iiiiddddreq');

 

  try {
    // 2️⃣ Check if user exists
    const user = await UserData.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Fetch bookings
    const booking = await bookingData.find({ userId: Id }).populate('productId')

    return res.status(200).json({ booking });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server side error" });
  }
};

// ❌ CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await bookingData.findById(bookingId);
console.log(booking);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();

    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const vendorViewbooking=async(req,res)=>{
  const shopId=req.params.Id;
  console.log('hhhhhhh');
  
  console.log(shopId);
  
 try{
  const shopexist=await VENDOR.findById(shopId)
  if(!shopexist ){
    return req.status(400).json({error:"shop not Found"})
  }
  const bookings=await bookingData.find().populate("productId").populate("userId")
  const filterBookings=bookings.filter((booking)=>booking.productId?.Vendorid?.toString()===shopId)
  console.log(bookings);
  console.log(filterBookings,'ppppppppp');
   return res.status(200).json({filterBookings})
   
  
 } catch(e){
  console.error(e);
    return res.status(500).json({ message: "Server side error" });
 }
}

// ✅ UPDATE BOOKING STATUS (Accept / Reject)
export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body; // Approved / Rejected
  console.log(bookingId,'ppppppppp');
  console.log(status,'st');
  
  

  try {
    const booking = await bookingData.findById(bookingId);
console.log(booking);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only pending can be updated
    // if (booking.status !== "pending") {
    //   return res
    //     .status(400)
    //     .json({ message: "Booking already processed" });
    // }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      message: `Booking ${status} successfully`,
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server side error" });
  }
};
