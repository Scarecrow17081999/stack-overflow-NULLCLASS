import React, { useEffect } from "react";
import "./HomeMainBar.scss";
import Loader from "../loader/Loader";
import { Link, useLocation } from "react-router-dom";
import Question from "../question/Question";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../actions/askQAction";

const HomeMainBar = () => {
  const { questions: questionList } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllQuestion());
  }, [dispatch]);
  const location = useLocation();
  return (
    <div id="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <Link to="/ask-question">
          <button>Ask Question</button>
        </Link>
      </div>

      <div>
        {questionList && <p>{questionList.length} Questions</p>}
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
