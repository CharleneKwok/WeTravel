import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { sendGetUser } from "../../api/feature-api";
import { userLogout } from "../../store/auth-actions";
import AllPosts from "../explore/AllPosts";
import Page from "../UI/Page";
import UserInfo from "./UserInfo";
import classes from "./UserSpace.module.scss";

const UserSpace = (props) => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");
  const [userInfo, setUserInfo] = useState({});
  const currUser = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      if (userId) {
        try {
          const resp = await sendGetUser(userId);
          if (resp.status === 200) {
            setUserInfo(resp.data);
          }
        } catch ({ response }) {
          if (response.status === 401) {
            dispatch(userLogout(currUser.email));
            localStorage.removeItem("profile");
            history.push("/login");
          }
        }
      } else {
        setUserInfo(props.user);
      }
    };
    getUserInfo();
  }, [userId]);

  return (
    <Page isDarkMode={true}>
      {userInfo && (
        <>
          <UserInfo user={userInfo}>
            <p>{userInfo.bio || "This user does not have bio:("}</p>
          </UserInfo>
          <AllPosts
            className={classes.posts}
            setPosts={setPosts}
            posts={posts}
            isUserPosts={true}
            userId={userId}
          />
        </>
      )}
    </Page>
  );
};

export default withRouter(UserSpace);
