import React, { useEffect } from "react";
import "./Navbar.scss";
import decode from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { getUser, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.getUser);
  const [myTokenVal, setMyTokenVal] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log();
  var allcookies = document.cookie;
  useEffect(() => {
    const myCookie = allcookies.split("=");
    const myToken = () => {
      if (myCookie[0] == "token") {
        setMyTokenVal(myCookie[1]);
      }
    };
    myToken();

    if (myTokenVal) {
      if (decode(myTokenVal).exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        setMyTokenVal("");
        navigate("/");
      }
    }

    dispatch(getUser());
  }, [dispatch, myTokenVal]);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  return (
    <>
      <nav className="main-nav">
        <div id="nav-bar">
          <Link to="/">
            <img style={{ width: "100px" }} src={logo} alt="" />
          </Link>
          <Link className="nav-link" to="/">
            About
          </Link>
          <Link className="nav-link" to="/">
            Products
          </Link>
          <Link className="nav-link" to="/subscribe">
            Change Plan
          </Link>
          <form className="nav-form" action="">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
            <button
              className="nav-button"
              type="submit"
              style={{ display: "none" }}
            ></button>
          </form>
          {user ? (
            <>
              <Link to="/user">
                <Avatar />
              </Link>
              <button onClick={handleLogout} className="button">
                Log out
              </button>
            </>
          ) : (
            <>
              {!location.pathname == "/auth" && (
                <Link to="/auth">
                  <button className="button">Login</button>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
