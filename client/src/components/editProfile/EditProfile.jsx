import { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { TextArea } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import "./scss/UsersProfile.scss";
import { getMyProfile, updateMyProfile } from "../../actions/userActions";

const EditProfile = ({ setViewEdit, User }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(User?.name);
  const [about, setAbout] = useState(User?.about);
  const [tags, setTags] = useState(User?.tags);

  const handleUpdate = (e) => {
    if (tags.length > 0) {
      dispatch(updateMyProfile({ name, about, tags }));
      setViewEdit(false);
      alert("Profile Updated");
      return;
    }

    dispatch(updateMyProfile({ name, about }));
    setViewEdit(false);
  };
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form onSubmit={handleUpdate} action="POST" className="edit-profile-form">
        <label htmlFor="editName">
          <h3>Display Name</h3>
          <input
            type="text"
            id="editName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <TextArea
            placeholder="Tell us more"
            style={{ minHeight: 100 }}
            type="text"
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <TagsInput
            style={{ margin: "50px", width: "500px" }}
            value={tags}
            onChange={setTags}
            placeHolder="Add Tags..."
          />
        </label>
        <input
          type="submit"
          value={"Save Profile"}
          className="user-submit-btn"
        />
        <button type="button" style={{ color: "white" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
