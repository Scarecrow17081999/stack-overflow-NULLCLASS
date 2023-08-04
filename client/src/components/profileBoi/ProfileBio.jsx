import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import React from "react";
const Container = styled.div`
  > * {
    margin: 2rem 0;
    border-bottom: 1px solid #eaeaea;
  }
`;
const style = { margin: "1rem 0" };
const ProfileBio = ({ User }) => {
  return (
    <Container>
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
            <p style={style}>
              {User?.isSubscribed ? "Plan Active" : "No Plan Active"}{" "}
            </p>
            <p style={style}>#{User?.payments?.at(-1)?.plan}</p>
          </>
        ) : (
          <p>No bio Available</p>
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
    </Container>
  );
};

export default ProfileBio;
