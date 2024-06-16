import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllJobs = () => {
  const [jobs, setjob] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/seeker/alljobs`,

          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        setjob(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
        }
      }
    };
    fetchJob();
  }, [""]);

  const handleApply = async (id) => {
    try {
      const apply = await axios.put(`${backendUrl}/seeker/jobs/${id}`, {
        s_id: localStorage.getItem("stoken"),
      });
      toast.success(apply.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.toast.error(error.message);
      }
    }
  };
  return (
    <Div>
      <ToastContainer />
      <ul>
        {jobs.map((item, index) => (
          <div className='card' key={index}>
            <li>
              <h5>Job-title: {item.title}</h5>
              <p>{item.description}</p>
              <p>{item.salary}</p>
              <p>{item.location}</p>

              <button onClick={() => handleApply(item._id)}>Apply</button>
            </li>
          </div>
        ))}
      </ul>
    </Div>
  );
};

export default AllJobs;
const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .card {
    width: 40%;
  }
  ul li {
    list-style: none;
  }
  h5 {
    background: #3d5980;
  }
`;
