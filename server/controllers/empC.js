import employer from "../models/employer.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

//registration of employer
export const addEmp = async (req, res) => {
  try {
    const { companyname, email, password, jobs, location } = req.body;
    const findemp = await employer.findOne({ email });
    if (findemp) {
      return res.status(500).json({ message: "User already found" });
    }
    const newEmp = new employer({
      companyname,
      email,
      password,
      location,
      jobs,
    });
    await newEmp.save();
    return res.status(200).json({ newEmp, message: "registered successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

//login of employer
export const loginEmployer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findEmployer = await employer.findOne({ email });
    if (!findEmployer) {
      return res.status(404).json({ message: "Invalid email" });
    } else {
      const fPassword = findEmployer.password;

      if (fPassword !== password) {
        return res.status(404).json({ message: "Invalid password" });
      }
      return res
        .status(200)
        .json({ findEmployer, message: "Successfully loggedin " });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "internal server error" });
  }
};

//updating the employer profile

export const updEmp = async (req, res) => {
  try {
    const { companyname, email, password, jobs, location } = req.body;
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(id);
    const findemp = await employer.findById(userId);
    if (!findemp) {
      return res.status(400).json({ message: "User not found" });
    }

    const updateEmp = await employer.findByIdAndUpdate(
      userId,
      {
        ...findemp.toObject(),

        companyname,
        email,
        password,
        jobs,
        location,
      },
      {
        new: true,
      }
    );
    await updateEmp.save().then(console.log("Updated successfully"));

    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getEmp = async (req, res) => {
  const id = req.params.id;
  const userId = new mongoose.Types.ObjectId(id);

  try {
    const getEmp = await employer.findById(userId);
    if (getEmp) {
      return res.status(200).json(getEmp);
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};
