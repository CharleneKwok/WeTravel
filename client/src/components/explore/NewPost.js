import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import classes from "./NewPost.module.scss";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "../UI/Backdrop";
import { addPost } from "../../api/feature-api";
import { useDispatch } from "react-redux";
import { checkLogin, userLogout } from "../../store/auth-actions";
import { Redirect } from "react-router-dom";

const NewPost = ({ onClose, onPostBar, showNewPost }) => {
  const [postImages, setPostImages] = useState([]);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const addImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setPostImages((prev) => [...prev, reader.result].filter((i) => i));
      };
      reader.onload();
    }
  };

  const removeImageHandler = (image) => {
    setPostImages((prev) => [...prev].filter((i) => i !== image));
  };

  return (
    <>
      <div className={`${classes["new-post"]}`}>
        <Backdrop onClick={onClose} />
        <div>
          <h2>What's new today? </h2>
          <Formik
            initialValues={{
              postTitle: "",
              postContent: "",
            }}
            validationSchema={Yup.object({
              postTitle: Yup.string().required("👉Title cannot be empty"),
              postContent: Yup.string().required("👉Content cannot be empty"),
            })}
            onSubmit={async (value) => {
              if (postImages.length === 0) {
                setShowError(true);
                return;
              }
              try {
                const resp = await addPost(
                  value.postTitle,
                  value.postContent,
                  postImages
                );
                if (resp.status === 200) {
                  onPostBar();
                  onClose();
                  showNewPost(resp.data);
                }
              } catch ({ response }) {
                if (response.status === 401) {
                  console.log("new post failed cuz token");
                  const user = JSON.parse(localStorage.getItem("profile"));
                  dispatch(userLogout(user.email));
                  return <Redirect to={"/login"} />;
                }
              }
            }}
          >
            <Form>
              <Input id="postTitle" text="Title" type="text" />
              <Input
                id="postContent"
                text="Content"
                type="textarea"
                className={classes.content}
                isTextarea={true}
              />
              <div className={classes["post-pics"]}>
                {postImages.map((image, i) => (
                  <div
                    style={{ backgroundImage: `url(${image})` }}
                    className={classes["post-pics__show"]}
                    key={i}
                  >
                    <span onClick={() => removeImageHandler(image)}>
                      Remove
                    </span>
                  </div>
                ))}
                {postImages.length < 3 && (
                  <label
                    className={classes["post-pics__btn"]}
                    title="Add photo"
                  >
                    <AddIcon fontSize="large" className={classes["add-icon"]} />
                    <input type="file" onChange={addImageHandler} />
                  </label>
                )}
              </div>
              {showError && (
                <p className={classes.error}>👉At least one image</p>
              )}
              <button type="submit" className={classes["post-btn"]}>
                POST
              </button>
              <button className={classes.black} onClick={onClose}>
                CLOSE
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default NewPost;
