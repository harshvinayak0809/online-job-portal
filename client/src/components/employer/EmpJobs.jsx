import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const EmpJobs = () => {
  const [jobs, setjobs] = useState([]);
  const id = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/emp/${id}/jobs`,
          {
            id: id,
          },
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data.jobs);
        setjobs(response.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [""]);
  return (
    <Div>
      <h4>Posted Jobs</h4>
      <ul>
        {jobs.map((item, index) => (
          <div className='card' key={index}>
            <li>
              <h5>Job-title: </h5>
              {item.title}
              <p>{item.description}</p>
              <p>{item.salary}</p>
              <p>{item.location}</p>
              <Link to={`../jobapplicant/${item._id}`} jobs={jobs}>
                <button>View Applicants</button>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </Div>
  );
};

export default EmpJobs;

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
