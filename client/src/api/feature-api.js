import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"));
    req.headers.Authorization = user.token;
    return req;
  }
});

// for location collection list
export const getSaveList = (id) => API.get(`/saveList/${id}`);
export const addToSaveList = (data) => API.post("/saveList", data);
export const deleteItemOnList = (location_id) =>
  API.delete(`/saveList/${location_id}`);

// for user info setting
export const changeBio = (bio) => API.put("/user/settings/bio", bio);
export const changeAvatar = (avatar) =>
  API.put("/user/settings/avatar", avatar);
export const changeUsername = (username) =>
  API.put("/user/settings/username", username);
export const changeMap = (map) => API.put("/user/settings/map", map);
export const changeWholeApp = (wholeAppearance) =>
  API.put("/user/settings/whole", wholeAppearance);

// for posts
export const addPost = (title, content, images) =>
  API.post("/post", { title, content, images });
export const deletePost = (postId) => API.delete(`/post/${postId}`);
export const getUserPosts = (userId, offset) =>
  API.get(`/post/${userId}/${offset}`);

// like, comment and reply
export const likePost = (postId) => API.put(`/post/like/${postId}`);
export const unlikePost = (postId) => API.put(`/post/unlike/${postId}`);
export const addComment = (postId, content) =>
  API.post(`/post/comment/${postId}`, { content });
export const addReply = (postId, content, replyToId) =>
  API.post(`/post/reply/${postId}`, { content, replyToId });
export const getComments = (postId, offset) =>
  API.get(`/post/comment/${postId}/${offset}`);
export const getRelies = (postId) => API.get(`/post/comment/${postId}`);

// follow and unfollow
export const followUser = (followId) => API.put("/user/follow", { followId });
export const unfollowUser = (unfollowId) =>
  API.put("/user/unfollow", { unfollowId });

export const getFollowingList = (userId) =>
  API.get(`/user/following/${userId}`);
export const getFollowersList = (userId) =>
  API.get(`/user/followers/${userId}`);

export const sendGetUser = (id) => API.get(`/user/${id}`);
