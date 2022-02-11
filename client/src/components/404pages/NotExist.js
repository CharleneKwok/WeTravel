import React from "react";
import classes from "./NotExist.module.scss";

const NotExist = () => {
  return (
    <div className={classes.container}>
      <img src="https://i.imgur.com/lKJiT77.png" alt="a dog eating the paper" />
      <h2>A Dog Ate this Page</h2>
      <p>
        Your dog is cute but honestly a menace. Where are my shoes? Where is my
        graduation certificate? Where is the chocolate cake I baked for my
        Aunt’s birthday? And why did you take your dog to the vet on that same
        Thursday?!
      </p>
    </div>
  );
};

export default NotExist;
