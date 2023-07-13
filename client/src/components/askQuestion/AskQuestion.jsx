import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AskQuestion.css";
import Loader from "../loader/Loader";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { TagsInput } from "react-tag-input-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/askQAction";
import { Snackbar } from "@mui/material";

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name: userPosted } = useSelector((state) => state.getUser);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const handleQuill = (e) => {
    setBody(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || body === "" || tags.length === 0) {
      // alert("Please fill all the fields");
      handleClick();
      return;
    }

    const Qbody = {
      questionTitle: title,
      questionBody: body,
      questionTags: tags,
    };

    dispatch(askQuestion({ ...Qbody, userPosted }, navigate));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="add-question">
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Please fill all the fields"
            action={action}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          />
          <form onSubmit={handleSubmit} className="add-question-container">
            <div className="head-title">
              <h1>Ask Question</h1>
            </div>
            <div className="question-container">
              <div className="question-options">
                <div className="question-option">
                  <div className="question-title">
                    <h3>Title</h3>
                    <small>
                      Be specific and imagine your're asking a question to
                      another person.
                    </small>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="Add Question Title."
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="question-title">
                    <h3>Body</h3>
                    <small>
                      Include all the information someone would need to answer
                      you question.
                    </small>
                    {/* <input type="text" placeholder="Add Question Title." /> */}
                    <ReactQuill
                      required
                      className="react-quill"
                      theme="snow"
                      value={body}
                      onChange={handleQuill}
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="question-title">
                    <h3>Tags</h3>
                    <small>
                      Add upto 5 tags to describe what your queation is about.
                    </small>
                    <TagsInput
                      style={{ margin: "50px" }}
                      value={tags}
                      onChange={setTags}
                      placeHolder="Add Tags..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="button">
              Add Your Question
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AskQuestion;
