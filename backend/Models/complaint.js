import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    workerId:{
        type: Schema.Types.ObjectId,
        ref: "Worker",
    },
    issueTitle: {
      type: String,
     
      trim: true,
    },
    issueDescription: {
      type: String,
      required: true,
      trim: true,
    },
    issueType: {
      type: String,
      enum: ["Quality", "Delivery", "Payment", "Other"],
      default: "Other",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    resolvedAt: {
      type: Date,
    },
    reply:{
        type:String,
     
    }
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
