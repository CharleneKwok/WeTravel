import User from "../auth/user.js";
import Comment from "./commentModel.js";
import Post from "./postModel.js";
import Reply from "./replyModel.js";

// add post
export const addPost = async (req, res) => {
  const { user, content, images, title } = req.body;
  if (images.length < 1) {
    return res.status(400).send("At least one image");
  }
  const newPost = {
    title: title,
    userId: user._id,
    content: content,
    images: images,
    likes: [],
    comments: [],
  };
  const post = await Post.create(newPost);
  await post.save();
  return res
    .status(200)
    .json({ ...post._doc, username: user.username, avatar: user.avatar });
};

// delete post
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res.status(400).send("no postId");
  }
  await Post.deleteOne({ _id: postId });
  return res.status(200).send("Delete Post successful!");
};

// get posts of certain user
export const getPosts = async (req, res) => {
  const { userId, offset } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const userPosts = await Post.find({ userId: user._id })
    .skip(offset)
    .limit(10);
  const postsWithName = userPosts.map(async (post) => {
    return { ...post._doc, username: user.username };
  });
  Promise.all(postsWithName).then((posts) => {
    return res.status(200).json({ posts: posts });
  });
};

// get random posts
// offset 10
export const getRandomPosts = async (req, res) => {
  const { offset } = req.params;
  // const { offset } = req.body;
  const allPosts = await Post.find({}).skip(offset).limit(10);
  const len = await Post.estimatedDocumentCount();
  // const ramdomList = Array.from({ length: 10 }, () =>
  //   Math.floor(Math.random() * 10)
  // );

  const postsWithName = allPosts.map(async (post) => {
    const user = await User.findById(post.userId);
    return { ...post._doc, username: user.username, avatar: user.avatar };
  });
  Promise.all(postsWithName).then((posts) => {
    return res.status(200).json({ posts: posts, len: len });
  });
};

// like the post
export const likePost = async (req, res) => {
  const { user } = req.body;
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  post.likes.push(user._id);
  await post.save();
  return res.status(200).json(post.likes);
};

// unlike the post
export const unlikePost = async (req, res) => {
  const { user } = req.body;
  const { postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const likes = post.likes;
  post.likes = likes.filter((id) => !id.equals(user._id));
  await post.save();
  return res.status(200).json(post.likes);
};

// add comment to one post
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const { user, content } = req.body;
  const comment = await Comment.create({
    userId: user._id,
    content: content,
    onPostId: postId,
  });
  await comment.save();
  return res
    .status(200)
    .json({ username: user.username, avatar: user.avatar, ...comment._doc });
};

// get comments of one post and info of post
export const getComments = async (req, res) => {
  const { postId, offset } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const allCmts = await Comment.find({ onPostId: postId });
  const len = allCmts.length;
  const comments = await Comment.find({ onPostId: postId })
    .skip(offset)
    .limit(10);
  if (!comments) {
    return res.status(200).json([]);
  }
  const commentsWithName = comments.map(async (com) => {
    const user = await User.findById(com.userId);

    return { ...com._doc, username: user.username, avatar: user.avatar };
  });
  Promise.all(commentsWithName).then((comments) => {
    return res.status(200).json({ comments: comments, len: len });
  });
};

// reply one comment
export const replyComment = async (req, res) => {
  const { commentId } = req.params;
  const { user, content, replyToId } = req.body;
  const reply = await Reply.create({
    replyToId,
    content,
    replyFromId: user._id,
    onCommentId: commentId,
  });
  await reply.save();
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).send("Comment not found");
  }
  comment.reply++;
  await comment.save();
  return res.status(200).send("Reply successful!");
};

// get reply from one comment
export const getReplies = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).send("Comment not found");
  }
  const replies = await Reply.find({ onCommentId: commentId });
  if (!replies) {
    return res.status(404).send("No replies");
  }
  const repliesWithName = replies.map(async (reply) => {
    const fromUser = await User.findById(reply.replyFromId);
    const toUser = await User.findById(reply.replyToId);
    return {
      ...reply._doc,
      fromUsername: fromUser.username,
      toUsername: toUser.username,
    };
  });
  Promise.all(repliesWithName).then((replies) => {
    return res.status(200).json(replies);
  });
};
