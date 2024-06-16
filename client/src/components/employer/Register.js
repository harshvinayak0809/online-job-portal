import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    companyname: "",
    password: "",
    email: "",
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
      const response = await axios.post(`${backendUrl}/emp/add`, {
        companyname: formData.companyname,
        password: formData.password,
        email: formData.email,
      });

      if (response.status >= 400) {
        toast.error(response.data.message || "Registration failed");
      } else {
        toast.success(response.data.message || "Registration successful");

        // Delay navigation to ensure toast is visible
        setTimeout(() => {
          navigate("../login");
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  return (
    <>
      <ToastContainer />

      <Navbar className='bg-body-tertiary' sticky='top'>
        <Container>
          <Navbar.Brand href='/'>Online Job Portal</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>Designed by: Harsh Vinayak</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Div>
        <Form onSubmit={handleSubmit}>
          <label htmlFor=''>Register</label>
          <input
            type='text'
            placeholder='Enter Company name'
            name='companyname'
            value={formData.companyname}
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            minLength='8'
          />
          <button type='submit'>Register</button>
          Already registered?
          <Link to='/employer/login'> Click here to Login</Link>
        </Form>
      </Div>
    </>
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
  justify-content: center;
  align-items: center;
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
