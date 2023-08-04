import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import moment from "moment";
import CakeIcon from "@mui/icons-material/Cake";
import EditProfile from "../components/editProfile/EditProfile";
import ProfileBio from "../components/profileBoi/ProfileBio";
import { getMyProfile } from "../actions/userActions";
import { useEffect } from "react";
const style = {
  backgroundColor: "purple",
  color: "white",
  width: "100px",
  height: "100px",
  borderRadius: "5px",
  fontSize: "4rem",
  textAlign: "center",
  cursor: "pointer",
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 1rem",
};
const UserProfile = () => {
  const dispatch = useDispatch();
  const [viewEdit, setViewEdit] = useState(false);
  const { user: User } = useSelector((state) => state.myProfile);
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch, viewEdit]);

  return (
    <div className="home-containers">
      <LeftSideBar />
      <div className="home-container-1" style={{ paddingTop: "3rem" }}>
        <section>
          <div className="user-details-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
              }}
              className="user-details"
            >
              <div style={style}>
                <p>{User?.name?.charAt(0).toUpperCase()}</p>
              </div>
              <div className="user-name">
                <h1>{User?.name}</h1>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CakeIcon sx={{ margin: "0 1rem 0 0", fontSize: "1.9rem" }} />
                  Joined {moment(User?.joinedOn).fromNow()}
                </div>
              </div>
            </div>
            <button
              className="button"
              onClick={() => setViewEdit((prev) => !prev)}
              style={{ height: "fit-content" }}
            >
              EDIT PROFILE
            </button>
          </div>
          {viewEdit ? (
            <EditProfile setViewEdit={setViewEdit} User={User} />
          ) : (
            <ProfileBio User={User} />
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
