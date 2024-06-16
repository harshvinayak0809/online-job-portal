import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import axios from "axios";
import Navigator from "./Navigator";
import EmpJobs from "./EmpJobs";
import CreateJobs from "./CreateJobs";
import Jobpage from "./Jobpage";

const EmployerRoute = () => {
  const [user, setuser] = useState(null);

  const navigate = useNavigate();

  const id = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/emp/${id}`,
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

          setuser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [id]);
  useEffect(() => {
    if (!user) {
      navigate("/employer/");
    }
  }, [""]);
  const handlelogout = () => {
    localStorage.removeItem("token");
    setuser(null);
    navigate("./login", { replace: true });
  };

  return (
    <div>
      {user && <Navigator handlelogout={handlelogout} />}
      <Routes>
        {user ? (
          <>
            <Route exact path='/register' element={<Navigate to='../' />} />

            <Route exact path='/login' element={<Navigate to='../' />} />
            <Route path='/*' element={<Navigate to='/employer/login' />} />

            <Route
              exact
              path='/'
              element={<Profile user={user} handlelogout={handlelogout} />}
            />
            <Route exact path='/jobs' element={<EmpJobs user={user} />} />
            <Route exact path='/createjobs' element={<CreateJobs />} />
            <Route exact path='/jobapplicant/:id' element={<Jobpage />} />
          </>
        ) : (
          <Route exact path='/' element={<Navigate to='./login' />} />
        )}
        <Route exact path='/register' element={<Register />} />

        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default EmployerRoute;
