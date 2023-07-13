import React, { useEffect } from "react";
import "./DisplayAnswers.scss";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import parse from "html-react-parser";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../actions/askQAction";
import { getMyProfile } from "../../actions/userActions";
const DisplayAnswers = ({
  answer,
  handleShare,
  question,
  questionId,
  setQuestionState,
}) => {
  const { user } = useSelector((state) => state.myProfile);
  let answerBody = answer?.answerBody;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  let handleDelete = (answerId, noOfAnswers) => {
    dispatch(
      deleteAnswer(questionId, { answerId, noOfAnswers: noOfAnswers - 1 })
    );
    setQuestionState((prev) => !prev);
  };
  return (
    <div className="display-ans">
      <pre
        style={{
          width: " 100%",
          overflow: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {answer?.answerBody && parse(answerBody)}
      </pre>
      <div className="question-actions-user">
        <div>
          <button onClick={handleShare}>Share</button>
          {answer?.userId == user?._id && (
            <button
              onClick={() => handleDelete(answer._id, question?.noOfAnswers)}
            >
              Delete
            </button>
          )}
        </div>
        <div>
          <p>Aswered {moment(answer?.answeredOn).fromNow()} </p>
          <Link style={{ width: "100px" }} to={`/users/${answer?.userId}`}>
            <Avatar>
              {answer && answer?.userAnswered?.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayAnswers;
