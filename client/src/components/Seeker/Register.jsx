import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [formData, setFormData] = useState({
    sname: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    qualification: "",
    marks: "",
    experience: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/seeker/add`, {
        name: formData.sname,
        email: formData.email,
        password: formData.password,
        experience: formData.experience,
        age: formData.age,
        phone: formData.phone,
        qualification: formData.qualification,
        marks: formData.marks,
      });
      console.log(response.data);
      navigate("../login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <Div>
      <Form action='' onSubmit={handleSubmit}>
        <label htmlFor=''>Register</label>
        <input
          type='text'
          placeholder='Enter Your name'
          name='sname'
          value={formData.sname}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Enter your email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Enter your password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Enter your phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          placeholder='Enter your age'
          name='age'
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Enter your qualification'
          name='qualification'
          value={formData.qualification}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Enter your Marks'
          name='marks'
          value={formData.marks}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          placeholder='Total Experience(in months)'
          name='experience'
          value={formData.experience}
          onChange={handleChange}
          required
        />
        <button type='submit'>Register</button>
        Already registered!
        <Link to='/seeker/login'> Click here to Login</Link>
      </Form>
    </Div>
  );
};

export default Register;
const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 35vh;
  justify-content: center;
  align-items: center;
  // border: 2px solid grey;
  border-radius: 2rem;
  box-shadow: 0 0 10px #98c1d9;
  backdrop-filter: 10px;
  input,
  button {
    margin: 0.5rem;
    width: 80%;
    border-radius: 2rem;
    border: none;
    text-align: center;
    height: 2rem;
    outline: none;
    font-size: 1.1rem;
  }
  button {
    background: #3d5980;
    color: white;
  }
  label {
    font-size: 30px;
    width: 95%;
    text-align: center;
    border-bottom: 1px solid grey;
    margin-bottom: 2rem;
  }
`;
