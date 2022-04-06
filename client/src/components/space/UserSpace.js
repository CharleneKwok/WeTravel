import React from "react";
import Page from "../UI/Page";
import UserInfo from "./UserInfo";
import classes from "./UserSpace.module.scss";

const UserSpace = (props) => {
  return (
    <Page isDarkMode={true}>
      <UserInfo user={props.user} self={false}>
        <p>{props.user.bio}</p>
      </UserInfo>
    </Page>
  );
};

export default UserSpace;
