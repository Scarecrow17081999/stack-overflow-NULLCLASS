import React from "react";
import User from "../components/user/User";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";

const UserPage = () => {
  return (
    <div className="home-containers">
      <LeftSideBar />
      <div className="home-container-1" style={{ paddingTop: "3rem" }}>
        <User />
      </div>
    </div>
  );
};

export default UserPage;
