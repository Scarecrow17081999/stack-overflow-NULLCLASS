import React, { useState } from "react";
import parse from "html-react-parser";
import "./DisplayQuestion.scss";
import ReactQuill from "react-quill";
import moment from "moment";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoaderFunc from "../loader/Loader";
import copy from "copy-to-clipboard";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

import { Avatar, Chip } from "@mui/material";
import DisplayAnswers from "../displayAnswers/DisplayAnswers";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  getQuestion,
  postAnswer,
  voteQuestion,
} from "../../actions/askQAction";

const DisplayQuestion = () => {
  const user = useSelector((state) => state.getUser);
  const { question } = useSelector((state) => state.questions);
  const [questionState, setQuestionState] = useState(false);
  let questionBody = question?.questionBody;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [answer, setAnswer] = useState("");
  const url = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    dispatch(getQuestion(id));
  }, [
    dispatch,
    questionState,
    question?.noOfAnswers,
    question?.upVote?.length,
    question?.downVote?.length,
  ]);
  useEffect(() => {
    if (questionState) {
      setQuestionState(false);
    }
  }, [questionState, question?.answer]);
  const handleSubmit = () => {
    if (!user) {
      alert("Please Login to continue");
      navigate("/auth");
      return;
    }

    if (!answer) {
      alert("Please enter your answer");
      return;
    }
    dispatch(
      postAnswer({
        id,
        noOfAnswers: question.answer.length + 1,
        answerBody: answer,
        userAnswered: user.name,
      })
    );
    dispatch(getQuestion(id));
    setQuestionState((prev) => !prev);
    setAnswer("");
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Link copied to clipboard", url + location.pathname);
  };
  const handleDelete = () => {
    dispatch(deleteQuestion(id));
    navigate("/");
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", user._id));
    setQuestionState((prev) => !prev);
  };
  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", user._id));
    setQuestionState((prev) => !prev);
  };
  return (
    <>
      {question ? (
        <section id="question-details-page">
          <div className="question-details-container">
            <h1>#{question?.questionTitle}</h1>
            <div
              style={{ display: "flex" }}
              className="main-question-container"
            >
              <div className="question-detail-container-1">
                <ArrowDropUp onClick={handleUpVote} />
                <p>{question?.upVote?.length - question?.downVote?.length}</p>
                <ArrowDropDown onClick={handleDownVote} />
              </div>
              <div style={{ width: "100%" }}>
                <pre
                  style={{
                    width: " 100%",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    margin: "1.5rem 0",
                    padding: "1.5rem",
                    backgroundColor: "#fafafa",
                  }}
                  className="question-body"
                >
                  <>{question && parse(questionBody)}</>
                </pre>
                <div className="question-detail-tags display-tags ">
                  {question &&
                    question?.questionTags?.map((tag) => (
                      <Chip
                        className="display-tags"
                        style={{ margin: "1rem .3rem" }}
                        key={tag}
                        label={tag}
                      />
                    ))}
                </div>
                <div className="question-action-user">
                  <div>
                    <button onClick={handleShare}>Share</button>
                    {question?.userId == user?._id && (
                      <button onClick={handleDelete}>Delete</button>
                    )}
                  </div>
                  <div>
                    <p>
                      Asked {question && moment(question?.askedOn).fromNow()}
                    </p>
                    <Link
                      style={{ width: "100px" }}
                      to={`/user/${question?.userId}`}
                    >
                      <Avatar>
                        {question &&
                          question?.userPosted?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {question?.noOfAnswers ? (
            <section>
              <h3>{question.noOfAnswers} Answers</h3>
              {question?.answer?.map((answer) => (
                <DisplayAnswers
                  key={answer._id}
                  answer={answer}
                  handleShare={handleShare}
                  question={question}
                  questionId={id}
                  setQuestionState={setQuestionState}
                />
              ))}
            </section>
          ) : null}
          <ReactQuill
            required
            className="react-quill"
            theme="snow"
            value={answer}
            onChange={(value) => setAnswer(value)}
          />
          <button onClick={handleSubmit} type="submit" className="button">
            Your Answer
          </button>
        </section>
      ) : (
        <LoaderFunc />
      )}
    </>
  );
};

export default DisplayQuestion;
