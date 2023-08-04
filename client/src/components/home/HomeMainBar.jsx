import React, { useEffect } from "react";
import "./HomeMainBar.scss";
import Loader from "../loader/Loader";
import { Link, Navigate, useLocation } from "react-router-dom";
import Question from "../question/Question";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../actions/askQAction";
import { getMyProfile } from "../../actions/userActions";
import moment from "moment";

const HomeMainBar = () => {
  const { questions: questionList } = useSelector((state) => state.questions);
  const { user } = useSelector((state) => state.myProfile);
  const currentPlan = user?.payments?.at(-1)?.plan;

  const checkPlanValidity = () => {
    const utcDate = new Date(Date.now()).getDate();

    const noOfQuestions = questionList?.filter(
      (question) => question.userId == user?._id
    );

    const questionsAkedToday = noOfQuestions?.filter((question) => {
      let askedDate = moment(question.askedOn)
        .format("DD-MM-YYYY")
        .substring(0, 2);
      return askedDate == utcDate;
    });
    // console.log(questionsAkedToday);
    if (currentPlan === "free" && questionsAkedToday?.length >= 1) {
      return false;
    } else if (currentPlan === "silver" && questionsAkedToday?.length >= 5) {
      return false;
    } else if (currentPlan === "gold") {
      return true;
    }
    return true;
  };
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestion());
    dispatch(getMyProfile());
  }, [dispatch, user?.isSubscribed]);
  // if (!user?.isSubscribed) {
  //   return <Navigate to="/subscribe" />;
  // }
  return (
    <div id="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <Link to={checkPlanValidity() ? "/ask-question" : "/subscribe"}>
          <button className="button">Ask Question</button>
        </Link>
      </div>

      <div>
        {questionList && (
          <p style={{ margin: "0 0 1rem 0" }}>
            {questionList.length} Questions
          </p>
        )}
        {questionList ? (
          questionList?.map((question) => (
            <Question key={question._id} question={question} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default HomeMainBar;
