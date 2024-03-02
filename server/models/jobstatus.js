import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  applicant_id:{
    type:String,
    required:true
  },
  job_id:{
    type:String,
    required:true
  },
  status: {
    type: Boolean,
    default: null,
  },
});
const Status = mongoose.model("Status", statusSchema);
export default Status;