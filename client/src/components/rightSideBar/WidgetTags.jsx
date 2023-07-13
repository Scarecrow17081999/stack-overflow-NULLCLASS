import React from "react";
import Chip from "@mui/material/Chip";
const tags = [
  "c",
  "css",
  "scss",
  "express",
  "firebase",
  "HTML",
  "java",
  "JS",
  "MERN",
  "mongoDB",
  "mySQL",
  "Next.js",
  "Node.js",
  "PHP",
  "Python",
  "Reactjs",
];

const WidgetTags = () => {
  return (
    <div className="widget-tags">
      <h4>Watched</h4>
      <div className="widget-tags-div">
        {tags.map((tag, i) => (
          <Chip variant="outlined" size="small" key={i} label={tag} />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
