import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Profile = ({ user, handlelogout }) => {
  const [formData, setformData] = useState({
    sname: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    age: user.age,
    qualification: user.qualification,
    marks: user.marks,
    experience: user.experience,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${backendUrl}/seeker/update/${user._id}`, {
        sname: formData.companyname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        age: formData.age,
        qualification: formData.qualification,
        marks: formData.marks,
        experience: formData.experience,
      });
      toast.success(res.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Div>
      <ToastContainer />
      {user && (
        <DivC>
          <h4>Profile</h4>
          **Email Id cant be changed. To change please drop an email at
          xyz@xyz.com
          <span>
            {" "}
            <h5>Name:</h5>
            <input
              type='text'
              value={formData.sname}
              name='sname'
              onChange={handleChange}
            />
          </span>
          <span>
            {" "}
            <h5>Email:</h5>{" "}
            <input
              type='email'
              value={formData.email}
              name='email'
              onChange={handleChange}
              readOnly
            />
          </span>{" "}
          <span>
            {" "}
            <h5>Phone:</h5>
            <input
              type='number'
              value={formData.phone}
              name='location'
              onChange={handleChange}
              minLength={10}
            />
          </span>
          <span>
            {" "}
            <h5>Password:</h5>
            <input
              type='password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              minLength={8}
            />
          </span>
          <span>
            {" "}
            <h5>Qualification:</h5>
            <input
              type='text'
              value={formData.qualification}
              name='qualification'
              onChange={handleChange}
            />
          </span>
          <span>
            {" "}
            <h5>Marks:</h5>
            <input
              type='number'
              value={formData.marks}
              name='marks'
              onChange={handleChange}
            />
          </span>
          <span>
            {" "}
            <h5>Age:</h5>
            <input
              type='number'
              value={formData.age}
              name='age'
              onChange={handleChange}
              min={18}
            />
          </span>
          <span>
            {" "}
            <h5>Experince:</h5>
            <input
              type='number'
              value={formData.experience}
              name='experience'
              onChange={handleChange}
            />
          </span>
          <button onClick={handleUpdate}>Update</button>
        </DivC>
      )}
    </Div>
  );
};

export default Profile;

const DivC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;
  height: 50%;
  border-radius: 2rem;
  box-shadow: 0 0 10px #45b7ed;

  span {
    display: flex;
    flex-wrap: wrap;
    justify-conetnt: space-around;
    margin: 0.8rem 0;
  }
  h5 {
    width: 50%;
    text-align: center;
  }
  button {
    margin: 0 auto;
    width: 20%;
  }
  h4 {
    text-align: center;
  }
`;
const Div = styled.div`
  display: flex;
  width: 100vw;
  // height: 90vh;
  margin-top: 4rem;
  justify-content: center;
  align-items: center;
`;
