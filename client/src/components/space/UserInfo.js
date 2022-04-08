import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  followUser,
  getFollowersList,
  getFollowingList,
  unfollowUser,
} from "../../api/feature-api";
import { userLogout } from "../../store/auth-actions";
import Avatar from "../header/Avatar";
import classes from "./Space.module.scss";

const UserInfo = (props) => {
  const loginUser = JSON.parse(localStorage.getItem("profile"));
  const user = props.user;
  const isLoginUserSpace = loginUser._id === user._id;
  const dispatch = useDispatch();
  const history = useHistory();
  const [followStatus, setFollowStatus] = useState("");
  const [followers, setFollowers] = useState(user.followers);
  const [following, setFollowing] = useState(user.following);

  useEffect(() => {
    const getFollowList = async () => {
      try {
        let resp;
        resp = await getFollowersList(user._id);
        if (resp.status === 200) {
          if (!isLoginUserSpace) {
            const UserIdList = resp.data.map((user) => user.userId);
            setFollowStatus(
              UserIdList.includes(loginUser._id) ? "Unfollow" : "Follow"
            );
          }
          setFollowers(resp.data.length);
        }
        resp = await getFollowingList(user._id);
        if (resp.status === 200) {
          setFollowing(resp.data.length);
        }
      } catch ({ respsonse }) {
        dispatch(userLogout(loginUser.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    };
    if (Object.keys(user).length !== 0) {
      getFollowList();
    }
  }, [user]);

  const followUserHandler = async () => {
    try {
      let resp;
      if (followStatus === "Follow") {
        resp = await followUser(user._id);
        if (resp.status === 200) {
          setFollowStatus("Unfollow");
          setFollowers((prev) => prev + 1);
        }
      } else {
        resp = await unfollowUser(user._id);
        if (resp.status === 200) {
          setFollowStatus("Follow");
          setFollowers((prev) => prev - 1);
        }
      }
    } catch ({ response }) {
      if (response.status === 401) {
        dispatch(userLogout(loginUser.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    }
  };

  return (
    <div className={classes["space-image"]}>
      <div className={classes["user_info"]}>
        <div className={classes["user_info--avatar"]}>
          <Avatar src={user.avatar} />
          {!isLoginUserSpace && (
            <button onClick={followUserHandler}>{followStatus}</button>
          )}
        </div>
        <h2>{user.username}</h2>
        <div className={classes["user_info--follow"]}>
          <p>Followers: {followers}</p>
          <p>Following: {following}</p>
        </div>
        <div className={classes["user_info--bio"]}>
          bio:
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
