import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
const UserCard = ({ user }) => {
  return (
    <Link to={`/users/${user._id}`} className="user-profile-link">
      <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
      <h5>{user.name}</h5>
    </Link>
  );
};

export default UserCard;
