import React, { useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../header/Avatar";
import classes from "./Comments.module.scss";
import SendIcon from "@mui/icons-material/Send";
import { addComment, getComments } from "../../api/feature-api";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../store/auth-actions";

const Comments = ({ postId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [allComments, setAllComments] = useState([]);
  console.log("🚀 ~ allComments", allComments);
  const [offset, setOffset] = useState(0);
  const [cmtLength, setCmtLength] = useState(0);
  const [loadmsg, setLoadmsg] = useState("Loading...");
  const observer = useRef();

  const loadNewCmts = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prev) => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const resp = await getComments(postId, offset);
      if (resp.status === 200) {
        if (resp.data.comments.length === 0) {
          setLoadmsg("End");
          return;
        }
        setAllComments((prev) => prev.concat(resp.data.comments));
        setCmtLength(resp.data.len);
      }
    } catch (err) {
      console.log(err);
    }
  }, [postId, offset]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      if (content.trim().length === 0) {
        return;
      }
      const resp = await addComment(postId, content);
      if (resp.status === 200) {
        console.log("sent");
        setContent("");
        setAllComments((prev) => [resp.data].concat(prev));
        setCmtLength((prev) => prev + 1);
      }
    } catch ({ responce }) {
      if (responce.status === 401) {
        console.log("new post failed cuz token");
        dispatch(userLogout(user.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    }
  };

  return (
    <div className={classes.container}>
      <i>✉️ COMMENTS ({cmtLength})</i>
      <form className={classes["send-comment"]} onSubmit={sendComment}>
        <Avatar className={classes.avatar} />
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">
          <SendIcon className={classes.icon} titleAccess="Send comment" />
        </button>
      </form>
      {allComments.length !== 0 && (
        <>
          <div className={classes.comments}>
            {allComments.map((cmt, i) => (
              <div className={classes.comment} key={`comment_${i}`}>
                <Avatar src={cmt.avatar} />
                <div>
                  <h4>{cmt.username}</h4>
                  <p>{cmt.content}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={classes.loading} ref={loadNewCmts}>
            {loadmsg}
          </p>
        </>
      )}
      {allComments.length === 0 && (
        <p style={{ textAlign: "center" }}>No comments</p>
      )}
    </div>
  );
};

export default Comments;
