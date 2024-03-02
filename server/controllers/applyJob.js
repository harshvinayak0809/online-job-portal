import Job from "../models/Job";
import Seeker from "../models/seeker";
import mongoose from "mongoose";
import Status from "../models/jobstatus";
//apply for a job, so update the job collection as well seeker collection

// export const applyJob = async (req, res) => {
//   try {
//     const { j_id } = req.params;
//     const jUserId = new mongoose.Types.ObjectId(j_id);
//     const { s_id } = req.body;
//     const sUserId = new mongoose.Types.ObjectId(s_id);
//     const findUser = await Seeker.findById(sUserId);
//     if (!findUser) return res.status(404).json({ message: "User not found" });
//     const findJob = await Job.findById({ j_id });
//     if (!findJob) return res.status(404).json({ message: "Job not found" });

//     const updateJob = await Seeker.findByIdAndUpdate(
//       sUserId,
//       {
//         $push: { jobs: jUserId },
//       },
//       { new: true }
//     );
//     await updateJob.save();

//     const updateAppl = await Job.findByIdAndUpdate(
//       jUserId,
//       {
//         $push: { applicant: sUserId },
//       },
//       { new: true }
//     );
//     await updateAppl.save();

//     return res.status(200).json({ message: "Job applied successfully" });
//   } catch (error) {
//     return res.status(500).json(error, { message: "failed to apply" });
//   }
// };
export const applyJob = async (req, res) => {
  const { id } = req.params;
  const jUserId = new mongoose.Types.ObjectId(id);
  const { s_id } = req.body;
  const sUserId = new mongoose.Types.ObjectId(s_id);
  try {
    const findUser = await Seeker.findById(sUserId);
    if (!findUser) return res.status(404).json({ message: "User not found" });
    const findJob = await Job.findById(jUserId);
    if (!findJob) return res.status(404).json({ message: "Job not found" });

    const updateJob = await Seeker.findByIdAndUpdate(
      sUserId,
      {
        $push: { jobs: jUserId },
      },
      { new: true }
    );
    await updateJob.save();

    const updateAppl = await Job.findByIdAndUpdate(
      jUserId,
      {
        $push: { applicant: sUserId },
      },
      { new: true }
    );
    await updateAppl.save();
    try {
      const stat = new Status({
        applicant_id: sUserId,
        job_id: jUserId,
      });
      await stat.save();
      return res.status(200).json({ message: "status updated successfully" });

      //  return res.status(200).json({ message: "Job applied successfully" });
    } catch (error) {
      return res.status(501).json({ messsage: "status not updated", error });
    }
  } catch (error) {
    return res.status(500).json(error, { message: "failed to apply" });
  }
};
