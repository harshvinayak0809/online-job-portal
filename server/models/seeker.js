import mongoose from "mongoose";
import moment from "moment";
const seekSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,

    
    validate: {
      validator: (value) => Number.isInteger(value),
      message: "Age must be an integer",
    },
  },
  qualification: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,

    validate: {
      validator: (value) => Number.isInteger(value),
      message: "Experience must be an integer",
    },
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job", default: "" }],
});
const seeker = mongoose.model("seeker", seekSchema);
export default seeker;
