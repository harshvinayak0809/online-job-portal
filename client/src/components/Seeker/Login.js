import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  // const [err, seterr] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/seeker/login`, {
        password: formData.password,
        email: formData.email,
      });
      // console.log(response.data.findEmployer._id);
      localStorage.setItem("stoken", response.data.findSeeker._id);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("../profile", { shallow: true });
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
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
            <Navbar.Text>Designed by:Harsh vinayak</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Div>
        <Form onSubmit={handleSubmit}>
          <label htmlFor=''>Login</label>
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
          />
          <button type='submit'>Login</button>
          {/* {err && <div>{err}</div>} */}
          Not yet registered!<Link to='/seeker/register'> Click here</Link>
        </Form>
      </Div>
    </>
  );
};

export default Login;
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
