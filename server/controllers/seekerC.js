import Job from "../models/Job.js";
import seeker from "../models/seeker.js";
import mongoose from "mongoose";
import Status from "../models/jobstatus.js";

//registration of seeker
export const addSeeker = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      qualification,
      marks,
      experience,
    } = req.body;
    const findSeeker = await seeker.findOne({ email });
    if (findSeeker) {
      return res.status(501).json({ message: "User already found" });
    }
    const newSeeker = new seeker({
      name,
      email,
      password,
      phone,
      age,
      qualification,
      marks,
      experience,
    });
    await newSeeker.save();
    return res.status(200).json(newSeeker);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//login of user
export const loginSeeker = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findSeeker = await seeker.findOne({ email });
    if (!findSeeker) {
      return res.status(404).json({ message: "Invalid email id" });
    } else {
      const fPassword = findSeeker.password;

      if (fPassword !== password) {
        return res.status(500).json({ message: "Invalid password" });
      }
      return res
        .status(200)
        .json({ findSeeker, message: "Successfully loggedin " });
    }
  } catch (error) {
    return res.json({ error, message: "internal server error" });
  }
};

//getting seeker id
export const getSeeker = async (req, res) => {
  const id = req.params.id;
  // const userId = new mongoose.Types.ObjectId(id);

  try {
    const getSeek = await seeker.findById(id);
    if (getSeek) {
      return res.status(200).json(getSeek);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//updating the seeker
export const updSeeker = async (req, res) => {
  try {
    const {
      seekername,
      email,
      password,
      jobs,
      phone,
      qualification,
      marks,
      age,
    } = req.body;
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(id);
    const findseeker = await seeker.findById(userId);
    if (!findseeker) {
      return res.status(400).json({ message: "User not found" });
    }

    const updateSeeker = await seeker.findByIdAndUpdate(
      userId,
      {
        ...findseeker.toObject(),

        seekername,
        email,
        password,
        jobs,
        phone,
        qualification,
        marks,
        age,
      },
      {
        new: true,
      }
    );
    await updateSeeker.save();

    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
