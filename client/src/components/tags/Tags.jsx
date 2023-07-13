import React from "react";
import TagsList from "./TagsList.jsx";
import tagsData from "./tagsData.js";
import "./Tags.scss";
const Tags = () => {
  return (
    <div>
      <h1 className="tags-h1">Tags</h1>
      <p className="tags-p">
        A tag is a keyword or label that categorizes your question with other,
        similar questions.
      </p>
      <p className="tags-p">
        {" "}
        Using the right tags makes it easier for others to find and answer your
        question.
      </p>
      <div className="tags-list-container">
        {tagsData && tagsData.map((tag, i) => <TagsList tag={tag} key={i} />)}
      </div>
    </div>
  );
};

export default Tags;
