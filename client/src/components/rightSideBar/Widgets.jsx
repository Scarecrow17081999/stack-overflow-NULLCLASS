import React from "react";
import { Create, Forum } from "@mui/icons-material";
import blacklogo from "../../assets/blacklogo.svg";
const Widgets = () => {
  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="right-widget-sidebar-1">
        <div className="right-widget-sidebar-inner">
          <Create />
          <p>
            Observability is key to the future of software (and your DevOps
            career)
          </p>
        </div>
        <div className="right-widget-sidebar-inner">
          <Create />
          <p>Podcast 374: How valuable is your screen name?</p>
        </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="right-widget-sidebar-1">
        <div className="right-widget-sidebar-inner">
          <Forum />
          <p>Review queue workflows - Final release....</p>
        </div>
        <div className="right-widget-sidebar-inner">
          <Forum />
          <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
        <div className="right-widget-sidebar-inner">
          <img style={{ width: "1rem" }} src={blacklogo} alt="" />
          <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="right-widget-sidebar-1">
        <div className="right-widget-sidebar-inner">
          <p>14</p>
          <p>
            Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="right-widget-sidebar-inner">
          <p>10</p>
          <p>
            What is the best course of action when a user has high enough rep
            to...
          </p>
        </div>
        <div className="right-widget-sidebar-inner">
          <p>20</p>
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
