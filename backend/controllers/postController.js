// backend/backend/controllers/postController.js
const Post = require("../models/postModel");

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "name").sort("-createdAt");
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = await Post.create({
    user: req.user.id,
    text: req.body.text,
    image: req.file ? req.file.path : null,
  });
  res.json(post);
};
