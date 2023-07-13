import React from "react";
import { Link } from "react-router-dom";
import "./scss/Question.scss";
import moment from "moment";
import { Chip } from "@mui/material";
const Question = ({ question }) => (
  <div className="display-question-container">
    <div className="display-votes-container">
      <p>{question && question.upVote.length - question.downVote.length}</p>
      <p>Votes</p>
    </div>
    <div className="display-votes-container">
      <p>{question && question.noOfAnswers}</p>
      <p>Answers</p>
    </div>
    <div className="display-question-details">
      <Link className="question-title-link" to={`/questions/${question._id}`}>
        #{question && question.questionTitle}
      </Link>
      <div className="display-tags-time">
        <div className="display-tags">
          {question &&
            question?.questionTags?.map((tag, i) => (
              <Chip style={{ margin: "1rem .3rem" }} key={i} label={tag} />
            ))}
        </div>
        <p className="display-time">
          Posted {question && moment(question?.askedOn).fromNow()} By{" "}
          {question?.userPosted}
        </p>
      </div>
    </div>
  </div>
);

export default Question;
