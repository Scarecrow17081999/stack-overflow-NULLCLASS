import React, { useEffect } from "react";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import HomeMainBar from "../components/home/HomeMainBar.jsx";
import RightSideBar from "../components/rightSideBar/RightSideBar.jsx";
import { useSelector } from "react-redux";
import LoaderFunc from "../components/loader/Loader";

const HomePage = () => {
  const loading = "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <LoaderFunc />
      ) : (
        <div className="home-containers">
          <LeftSideBar />
          <div className="home-container-1">
            <HomeMainBar />
            <RightSideBar />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
