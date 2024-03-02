import React from "react";

const Profile = ({user}) => {
  return <div>
    <label >Name: <h4>{user.name}</h4>
    </label>

  </div>;
};

export default Profile;
