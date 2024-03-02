import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const SeekJobs = () => {
  const [myJobs, setmyJobs] = useState([]);
  const id = localStorage.getItem("stoken");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/seeker/${id}/jobs`);
        const response = res.data;

        const updatedJobs = await Promise.all(
          response.map(async (job) => {
            // Fetch job status for the current job
            const jid = job._id;
            const aid = localStorage.getItem("stoken");
            const statusResponse = await axios.get(
              `${backendUrl}/seeker/getstatus/${aid}/${jid}`
            );
            const statusData = statusResponse.data.status;

            if (statusData == false) {
              return { ...job, statusjob: " Rejected", color: "red" };
            } else if (statusData == true) {
              return { ...job, statusjob: "Accepted", color: "green" };
            } else {
              return { ...job, statusjob: "no response" };
            }
          })
        );
        setmyJobs(updatedJobs);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
        }
      }
    };
    fetchMyJobs();
  }, [id]);

  return (
    <Div>
      <h2>Status of Your job</h2>
      <div className='jobDiv'>
        {myJobs.map((item, index) => (
          <div key={index} className='jobDetails'>
            <h4>Job {index + 1}</h4>
            <span>
              <h5>Job Title: </h5>
              <p>{item.title}</p>
            </span>
            <span>
              <h5>Salary: </h5>
              <p>{item.salary}</p>
            </span>
            <span>
              <h5>Location: </h5>
              <p>{item.location}</p>
            </span>
            <span>
              <h5>Job Status: </h5>
              <p style={{ color: item.color, fontWeight: 500 }}>
                {item.statusjob}
              </p>
            </span>
          </div>
        ))}
      </div>
    </Div>
  );
};

export default SeekJobs;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2{
    border-bottom:1px solid grey;
    width:100vw;
    text-align:center;
  }
  .jobDiv {
    display: flex;
    font-weight:500;
    h4 {
      background: grey;
      text-align: center;
    }
    span {
      display: flex;
    }
    .jobDetails {
      padding: 1rem;
      margin: 1rem;
      border-radius: 2rem;
      box-shadow: 0 0 10px #000;
    }
    
    }
  }
`;
