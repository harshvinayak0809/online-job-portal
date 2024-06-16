import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const profileId = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/job/add`, {
        title: formData.title,
        description: formData.description,
        salary: formData.salary,
        location: formData.location,
        profileId,
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
        navigate("./");
      }
    }
  };
  return (
    <Div>
      <ToastContainer />
      <h4>Post a Job</h4>
      <form onSubmit={handleSubmit}>
        <p>Fill out the Details carefully</p>
        <span>
          <label>Title:</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
          />
        </span>

        <span>
          <label>Description:</label>
          <textarea
            name='description'
            id=''
            cols='4'
            rows='4'
            value={formData.description}
            onChange={handleChange}
          />
        </span>
        <span>
          <label>Salary:</label>
          <input
            type='text'
            name='salary'
            value={formData.salary}
            onChange={handleChange}
          />
        </span>
        <span>
          <label>Location:</label>
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleChange}
          />
        </span>
        <input type='submit' value='Submit' className='btn' />
      </form>
    </Div>
  );
};

export default CreateJobs;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 80vh;
  justify-content: center;
  align-items: center;
  span {
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
    height: 80%;
    box-shadow: 0 0 20px #6e6e6e;
    border-radius: 2rem;
    padding: 1rem;
    p {
      border-bottom: 1px solid grey;
    }
    input {
      margin: 0.5rem 0;
      border-radius: 2rem;
      padding: 2px;
      text-align: center;
    }
    .btn {
      background-color: #21134e;
      color: #9e9e9e;
      &:hover {
        color: red;
      }
    }
  }
`;
