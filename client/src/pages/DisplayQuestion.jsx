import React from "react";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import RightSideBar from "../components/rightSideBar/RightSideBar.jsx";
import DisplayQuestion from "../components/displayQuestion/DisplayQuestion";

const Questions = () => {
  return (
    <div className="home-containers">
      <LeftSideBar />
      <div className="home-container-1">
        <DisplayQuestion />
        <RightSideBar />
      </div>
    </div>
  );
};

export default Questions;
