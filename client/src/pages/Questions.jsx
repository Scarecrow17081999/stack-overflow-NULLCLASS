import React from "react";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import HomeMainBar from "../components/home/HomeMainBar.jsx";
import RightSideBar from "../components/rightSideBar/RightSideBar.jsx";

const Questions = () => {
  return (
    <div className="home-containers">
      <LeftSideBar />
      <div className="home-container-1">
        <HomeMainBar />
        <RightSideBar />
      </div>
    </div>
  );
};

export default Questions;
