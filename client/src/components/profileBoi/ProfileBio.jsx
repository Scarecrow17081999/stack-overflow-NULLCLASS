import { Card, Chip } from "@mui/material";
import React from "react";
const style = { margin: "1rem 0" };
const ProfileBio = ({ User }) => {
  return (
    <div>
      <div>
        {User?.tags?.length != 0 ? (
          <>
            <h4 style={style}>Tags Watched</h4>
            {User?.tags?.map((tag, i) => (
              <Chip
                className="display-tags"
                style={{ margin: "0rem 1rem 1rem 0" }}
                key={i}
                label={tag}
              />
            ))}
          </>
        ) : (
          <p style={style}>No Tags Watchhed</p>
        )}
      </div>
      <div>
        {User?.about !== "" ? (
          <>
            <h4>About</h4>
            <p style={style}>{User?.about}</p>
          </>
        ) : (
          <p>No bio Available</p>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
