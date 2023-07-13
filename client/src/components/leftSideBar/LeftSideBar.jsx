import React from "react";
import "./LeftSideBar.scss";
import { NavLink } from "react-router-dom";
import GlobeIcon from "../../assets/Globe.svg";
const LeftSideBar = () => {
  return (
    <div style={{ position: "sticky", top: "100px" }} id="leftSideBar">
      <div className="side-nav">
        <NavLink className="side-nav-link" activeclassname="active" to="/">
          <p> Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
            <NavLink
              className="side-nav-link"
              activeclassname="active"
              to="/questions"
            >
              <img src={GlobeIcon} alt="globeIcon" />
              <p>Questions</p>
            </NavLink>
            <NavLink
              className="side-nav-link"
              activeclassname="active"
              to="/tags"
            >
              <p>Tags</p>
            </NavLink>
            <NavLink
              className="side-nav-link"
              activeclassname="active"
              to="/users"
            >
              <p>Users</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
