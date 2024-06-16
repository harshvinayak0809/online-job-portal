import express from "express";
import { addEmp, getEmp, loginEmployer, updEmp } from "../controllers/empC.js";
import {
  applicantJob,
  approveReject,
  createJob,
  getAllJobs,
  getJobStatus,
  getMyjobs,
  getSeekAllJobs,
} from "../controllers/JobC.js";
import {
  addSeeker,
  loginSeeker,
  getSeeker,
  updSeeker,
} from "../controllers/seekerC.js";
import { applyJob } from "../controllers/applyJob.js";

const router = express.Router();

router.post("/emp/add", addEmp); //employer register
router.post("/emp/login", loginEmployer); //employer login
router.get("/emp/:id", getEmp); // get employer by id
router.put("/emp/update/:id", updEmp); //upadte employer profile
router.get("/emp/:id/jobs", getMyjobs); //:id here is employer id--> get employer's all posted job
router.post("/job/add", createJob); //create a Job
// router.get("/emp/job/:id/applicants", applicantJob); //see all applicants of particular job id
router.get("/emp/job/:id/", applicantJob); //see all applicants of particular job id
router.put("/emp/job/:id/:jid/applicants", approveReject); //approve or reject any applicant

router.post("/seeker/add", addSeeker); //seeker register
router.post("/seeker/login", loginSeeker); //seeker login
router.put("/seeker/update/:id", updSeeker); //seeker login
router.get("/seeker/alljobs", getAllJobs); //show all available jobs
router.get("/seeker/getStatus/:id/:jid", getJobStatus); //get status of a job
router.get("/seeker/:id", getSeeker); //seeker login
router.put("/seeker/jobs/:id", applyJob); //apply to particular job by ID
router.get("/seeker/:id/jobs", getSeekAllJobs); //get all applied jobs

export default router;
