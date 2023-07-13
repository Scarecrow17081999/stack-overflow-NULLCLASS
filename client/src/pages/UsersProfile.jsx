import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../actions/userActions";
import CakeIcon from "@mui/icons-material/Cake";
import EditProfile from "../components/editProfile/EditProfile";
import ProfileBio from "../components/profileBoi/ProfileBio";
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const [viewEdit, setViewEdit] = useState(false);
  const { users } = useSelector((state) => state.getUser);
  const User = users?.find((user) => user._id === id);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
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
                  <CakeIcon sx={{ margin: "0 1rem 0 0" }} />
                  Joined {moment(User?.joinedOn).fromNow()}
                </div>
              </div>
            </div>
          </div>

          <ProfileBio User={User} />
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
