const express = require("express");
const Post = require("../models/postModel");
const { protect } = require("../middleware/authMiddleware");
const { getPosts, createPost } = require("../controllers/postController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * LIKE / UNLIKE POST
 * PUT /posts/:id/like
 */
router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    // return populated updated post (frontend friendly)
    const updatedPost = await Post.findById(req.params.id)
      .populate("user", "name username")
      .populate("comments.user", "name username");

    res.json(updatedPost);
  } catch (err) {
    console.error("LIKE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ADD COMMENT
 * POST /posts/:id/comment
 */
router.post("/:id/comment", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text: text.trim(),
    });

    await post.save();

    // return updated post populated
    const updatedPost = await Post.findById(req.params.id)
      .populate("user", "name username")
      .populate("comments.user", "name username");

    res.json(updatedPost);
  } catch (err) {
    console.error("COMMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/**
 * GET ALL POSTS
 * GET /posts
 */
router.get("/", protect, getPosts);

/**
 * CREATE POST (with optional image)
 * POST /posts
 */
router.post("/", protect, upload.single("image"), createPost);

module.exports = router;
