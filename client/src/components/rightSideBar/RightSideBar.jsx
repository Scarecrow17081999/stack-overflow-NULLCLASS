import React from "react";
import "./scss/RightSideBar.scss";
import Widgets from "./Widgets.jsx";
import WidgetTags from "./WidgetTags.jsx";
const RightSideBar = () => {
  return (
    <aside id="right-sidebar-main">
      <Widgets />
      <WidgetTags />
    </aside>
  );
};

export default RightSideBar;
