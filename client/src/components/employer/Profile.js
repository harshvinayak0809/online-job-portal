import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Profile = ({ user, handlelogout }) => {
  const [formData, setformData] = useState({
    cname: user.companyname,
    email: user.email,
    location: user.location,
    password: user.password,
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
      const res = await axios.put(`${backendUrl}/emp/update/${user._id}`, {
        companyname: formData.cname,
        email: formData.email,
        password: formData.password,
        location: formData.location,
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
            <h5>Comapany-name:</h5>
            <input
              type='text'
              value={formData.cname}
              name='cname'
              onChange={handleChange}
            />
          </span>
          <span>
            {" "}
            <h5>Email:</h5>{" "}
            <input
              type='text'
              value={formData.email}
              name='email'
              onChange={handleChange}
              readOnly
            />
          </span>{" "}
          <span>
            {" "}
            <h5>Location:</h5>
            <input
              type='text'
              value={formData.location}
              name='location'
              onChange={handleChange}
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
              minLength='8'
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
  box-sizing: border-box;

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
  height: 90vh;
  justify-content: center;
  align-items: center;
`;
