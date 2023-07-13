import { useState } from "react";
import "./Auth.scss";
import icon from "../../assets/icon.png";
import { Typography, styled } from "@mui/material";
import AboutAuth from "./AboutAuth";
import { useNavigate } from "react-router-dom";
import LoaderFunc from "../loader/Loader";
import { login, signUp } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const TermsAndServices = styled(Typography)`
  font-size: 0.8rem;
  font-family: inherit;
  color: #666767;
  > span {
    color: #007ac6;
  }
`;
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = false;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(signUp({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };
  return (
    <>
      {loading ? (
        <LoaderFunc />
      ) : (
        <section id="auth-section">
          {isSignUp && <AboutAuth />}
          <div className="auth-container-2">
            {!isSignUp && <img src={icon} alt="icon" />}

            <form action="POST" onSubmit={handleSubmit}>
              {isSignUp && (
                <label htmlFor="name">
                  <h4>Username</h4>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username..."
                    required
                    type="text"
                    id="name"
                    name="name"
                  />
                </label>
              )}
              <label htmlFor="authEmail">
                <h4>Email</h4>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email..."
                  required
                  type="email"
                  id="authEmail"
                  name="email"
                />
              </label>
              <label htmlFor="authPassword">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>Password</h4>
                  {!isSignUp && (
                    <p
                      style={{
                        color: "#007ac6",
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      Forgot Password?
                    </p>
                  )}
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="12345"
                  type="password"
                  id="authPassword"
                  name="password"
                  placeholder="Password..."
                />
                {isSignUp && (
                  <TermsAndServices>
                    Your password contains at least 8 <br /> characters,
                    including at least one number <br /> and includes both lower
                    and uppercase <br />
                    letters and special characters, #, ?, !.
                  </TermsAndServices>
                )}
              </label>

              {isSignUp && (
                <label htmlFor="check">
                  <input type="checkbox" name="check" id="check" />
                  <small>
                    <br />
                    Opt-in to receive occasional,product updates <br />
                    ,user research invitations <br />
                    ,company announcements,and digests.
                    <br />
                  </small>
                </label>
              )}
              <button type="submit">{!isSignUp ? "Login" : "Sign Up"}</button>
              {isSignUp && (
                <TermsAndServices>
                  {" "}
                  By clicking "Sign Up", you agree to our <br />
                  <span>terms of service</span> , <span>privacy policy</span>{" "}
                  and <span>cookie policy. </span>
                </TermsAndServices>
              )}
            </form>
            <small>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                className="button"
                style={{ background: "none", color: "#007ac6" }}
                onClick={() => setIsSignUp(!isSignUp)}
                type="button"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </small>
          </div>
        </section>
      )}
    </>
  );
};

export default Auth;
