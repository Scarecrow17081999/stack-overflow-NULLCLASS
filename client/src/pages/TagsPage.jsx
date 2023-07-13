import React from "react";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import Tags from "../components/tags/Tags";
const TagsPage = () => {
  return (
    <div className="home-containers">
      <LeftSideBar />
      <div className="home-container-1" style={{ paddingTop: "3rem" }}>
        <Tags />
      </div>
    </div>
  );
};

export default TagsPage;
