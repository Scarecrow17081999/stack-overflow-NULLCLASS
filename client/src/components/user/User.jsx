import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import UserCard from "./UserCard";
import "./scss/User.scss";
const User = () => {
  const { users } = useSelector((state) => state.getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="user-list-container">
      {users?.map((user) => (
        <UserCard user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default User;
