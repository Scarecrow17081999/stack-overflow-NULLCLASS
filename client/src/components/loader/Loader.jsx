import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";
import "./Loader.scss";
const LoaderFunc = () => (
  <Loader
    style={{
      backgroundColor: "transparent",
      borderRight: "none",
    }}
    className="loader"
    active
  />
);

export default LoaderFunc;
