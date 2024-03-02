import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Jobpage = () => {
  const { id } = useParams();

  const [applicant, setapplicant] = useState([]);
  const [job, setjob] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/emp/job/${id}`);

        setjob(response.data);
        const applicantId = response.data.applicant;
        const applicantsResponse = await Promise.all(
          applicantId.map(async (userId) => {
            const userResponse = await axios.get(
              `${backendUrl}/seeker/${userId}`
            );
            return userResponse.data;
          })
        );
        setapplicant(applicantsResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicant();
  }, [id]);

  const handleUpdate = async (status, id, jid) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/emp/job/${id}/${jid}/applicants`,
        { status: status }
      );
      alert(res.data.message);
    } catch (error) {}
  };

  return (
    <Pdiv>
      <div className='jobDiv'>
        <h2>Job Title:</h2> <h3>{job.title}</h3>
      </div>
      <Div>
        {applicant.map((item, index) => (
          <div key={index}>
            <h6>Applicant {index + 1}</h6>
            <span>
              <h5>Name: </h5>
              <p> {item.name}</p>
            </span>
            <span>
              <h5>Email: </h5>
              <p> {item.email}</p>
            </span>
            <span>
              <h5>Phone: </h5>
              <p> {item.phone}</p>
            </span>
            <span>
              <h5>Age: </h5>
              <p> {item.age} years</p>
            </span>
            <span>
              <h5>Qualification: </h5>
              <p> {item.qualification}</p>
            </span>
            <span>
              <h5>Marks: </h5>
              <p> {item.marks}%</p>
            </span>
            <span>
              <h5>Experience: </h5>
              <p> {item.experience} months</p>
            </span>
            <button onClick={() => handleUpdate(true, item._id, job._id)}>
              Approve
            </button>
            <button onClick={() => handleUpdate(false, item._id, job._id)}>
              Reject
            </button>
          </div>
        ))}
      </Div>
    </Pdiv>
  );
};

export default Jobpage;

const Pdiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  .jobDiv {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid grey;
  }
`;
const Div = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  height: 40%;

  div {
    border-radius: 2rem;
    box-shadow: 0 0 10px #000;
    margin: 1rem;
    width: 30%;
    padding: 1rem;
    h6 {
      color: whitesmoke;
      background: grey;
    }
    span {
      display: flex;
    }
    button {
      margin: 2rem;
    }
  }
`;
