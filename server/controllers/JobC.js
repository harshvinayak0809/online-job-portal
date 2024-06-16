import mongoose from "mongoose";
import employer from "../models/employer.js";
import Job from "../models/Job.js";
import Seeker from "../models/seeker.js";
import Status from "../models/jobstatus.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, profileId } = req.body;

    const newJob = new Job({
      title,
      description,
      salary,
      location,
    });

    const savedJob = await newJob.save();

    // Update the Profile to include the new Post ID
    const id = new mongoose.Types.ObjectId(profileId);

    try {
      const updateEmp = await employer.findByIdAndUpdate(
        id,
        {
          $push: { jobs: savedJob._id },
        },
        { new: true }
      );
      await updateEmp.save();
    } catch (err) {
      res.status(404).json(err);
    }

    res
      .status(201)
      .json({ message: "Post created successfully", postId: savedJob._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all jobs of an employee

export const getMyjobs = async (req, res) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);

  try {
    const getJobs = await employer.findById(userId).populate("jobs");
    if (!getJobs) {
      return res.status(404).json({ message: "user not found" });
    }
    const jobs = getJobs.jobs;
    return res.status(200).json({ jobs });
  } catch (error) {}
};

//get all jobs from the collection
export const getAllJobs = async (req, res) => {
  try {
    // Find all posts in the collection
    const allJobs = await Job.find();
    res.status(200).json(allJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//show all applicant of a Job
export const applicantJob = async (req, res) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);

  try {
    const getJobs = await Job.findById(userId);
    if (!getJobs) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log(getJobs.applicant);
    // const appli = getJobs.applicant;
    return res.status(200).json(getJobs);
    // return res.status(200).json({ getJobs });
  } catch (error) {
    res.send(error);
  }
};

//approve or reject Job
export const approveReject = async (req, res) => {
  const { id, jid } = req.params;
  const { status } = req.body;
  const userId = new mongoose.Types.ObjectId(id);
  const jobId = new mongoose.Types.ObjectId(jid);
  try {
    const updateJob = await Status.findOneAndUpdate(
      { $and: [{ applicant_id: userId }, { job_id: jobId }] },
      {
        $set: { status: status },
      },
      {
        new: true,
      }
    );
    await updateJob.save();
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "internal server error" });
  }
};

//get seeker all jobs
export const getSeekAllJobs = async (req, res) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);

  try {
    const getJobs = await Seeker.findById(userId).populate("jobs");
    if (!getJobs) {
      return res.status(404).json({ message: "user not found" });
    }
    const jobs = getJobs.jobs;
    return res.status(200).json(jobs);
  } catch (error) {}
};

//get job status
export const getJobStatus = async (req, res) => {
  const { id, jid } = req.params;
  const userId = new mongoose.Types.ObjectId(id);
  const jobId = new mongoose.Types.ObjectId(jid);
  console.log(userId, jobId);
  try {
    const getStatus = await Status.findOne({
      applicant_id: id,
      job_id: jid,
    });
    if (!getStatus) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(getStatus);
  } catch (error) {}
};
