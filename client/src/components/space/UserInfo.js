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
import FollowList from "./FollowList";
import classes from "./Space.module.scss";

const UserInfo = (props) => {
  const loginUser = JSON.parse(localStorage.getItem("profile"));
  const user = props.user;
  const isLoginUserSpace = loginUser._id === user._id;
  const dispatch = useDispatch();
  const history = useHistory();
  const [followStatus, setFollowStatus] = useState("Follow");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowList, setShowFollowList] = useState("");

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
          setFollowers(resp.data);
        }
        resp = await getFollowingList(user._id);
        if (resp.status === 200) {
          setFollowing(resp.data);
        }
      } catch ({ respsonse }) {
        if (respsonse.status === 401) {
          dispatch(userLogout(loginUser.email));
          localStorage.removeItem("profile");
          history.push("/login");
        }
      }
    };
    if (Object.keys(user).length !== 0) {
      getFollowList();
    }
  }, [user]);

  const followUserHandler = async (currStatus) => {
    try {
      let resp;
      if (currStatus === "Follow") {
        resp = await followUser(user._id);
        if (resp.status === 200) {
          setFollowStatus("Unfollow");
          setFollowers((prev) => {
            prev.push({
              avatar: loginUser.avatar,
              userId: loginUser._id,
              username: loginUser.username,
            });
            return [...prev];
          });
        }
      } else {
        resp = await unfollowUser(user._id);
        if (resp.status === 200) {
          setFollowStatus("Follow");
          setFollowers((prev) => {
            const l = prev.filter((user) => user.userId !== loginUser._id);
            return l;
          });
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

  const closeFollowList = () => {
    setShowFollowList("");
  };

  return (
    <div className={classes["space-image"]}>
      <div className={classes["user_info"]}>
        <div className={classes["user_info--avatar"]}>
          <Avatar src={user.avatar} />
          {!isLoginUserSpace && (
            <button onClick={() => followUserHandler(followStatus)}>
              {followStatus}
            </button>
          )}
        </div>
        <h2>{user.username}</h2>
        <div className={classes["user_info--follow"]}>
          <p onClick={() => setShowFollowList("Followers")}>
            Followers: {followers.length}
          </p>
          <p onClick={() => setShowFollowList("Following")}>
            Following: {following.length}
          </p>
        </div>
        <div className={classes["user_info--bio"]}>
          bio:
          {props.children}
        </div>
      </div>
      <FollowList
        text={showFollowList}
        onClose={closeFollowList}
        followers={followers}
        following={following}
        followUserHandler={followUserHandler}
      />
    </div>
  );
};

export default UserInfo;
