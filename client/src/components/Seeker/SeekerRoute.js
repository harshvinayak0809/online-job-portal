import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AllJobs from "./AllJobs";
import Login from "./Login";
import Navigator from "./Navigator";
import Profile from "./Profile";
import Register from "./Register";
import SeekJobs from "./SeekJobs";

function SeekerRoute() {
  const [user, setuser] = useState(null);
  const id = localStorage.getItem("stoken");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/seeker/${id}`,

            {
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // console.log(response.data);
          setuser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [id]);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("stoken");
    setuser(null);
    console.log(user);
    navigate("./login", { replace: true });
  };
  useEffect(() => {
    if (!user) {
      navigate("/seeker/");
    }
  }, [""]);
  return (
    <div>
      {user && <Navigator handlelogout={handlelogout} />}
      <Routes>
        {user ? (
          <>
            <Route exact path='/register' element={<Navigate to='../' />} />

            <Route exact path='/login' element={<Navigate to='../' />} />
            <Route exact path='/*' element={<Navigate to='/seeker/' />} />

            <Route exact path='/profile' element={<Profile user={user} />} />
            <Route
              exact
              path='/appliedjobs'
              element={<SeekJobs user={user} />}
            />
            <Route exact path='/' element={<AllJobs />} />
          </>
        ) : (
          <Route exact path='/' element={<Navigate to='./login' />} />
        )}
        <Route exact path='/register' element={<Register />} />

        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default SeekerRoute;
