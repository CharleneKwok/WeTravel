import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import classes from "./NewPost.module.scss";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Backdrop from "../UI/Backdrop";

const NewPost = ({ onClose }) => {
  const [postImages, setPostImages] = useState([]);

  const addImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("?");
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
              postTitle: Yup.string().required("Title cannot be empty"),
              postContent: Yup.string().required("Content cannot be empty"),
            })}
            onSubmit={(value, { setFieldError }) => {
              console.log(value);
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
