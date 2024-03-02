import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
  companyname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job", default: "" }],
});
const employer = mongoose.model("Employer", empSchema);
export default employer;
