import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import classes from "./Explore.module.scss";

const NewPost = (props) => {
  const [postImages, setPostImages] = useState([]);

  return (
    <div className={classes["new-post"]}>
      <h2>What's new Today? </h2>
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
          <Input id="postContent" text="Content" type="text" />
          <label className={classes["upload-images"]}>
            Upload Image
            <input type="file" />
          </label>
          <button type="submit">POST</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewPost;
