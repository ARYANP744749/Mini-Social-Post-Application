const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { protect } = require("../middleware/authMiddleware");

// PUT /api/users/:id/follow
router.put("/:id/follow", protect, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    if (targetUser._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const alreadyFollowing = currentUser.following.some(
      (id) => id.toString() === targetUser._id.toString()
    );

    if (alreadyFollowing) {
      // UNFOLLOW
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
    } else {
      // FOLLOW
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      isFollowing: !alreadyFollowing,
      message: alreadyFollowing ? "Unfollowed" : "Followed",
    });
  } catch (err) {
    console.error("FOLLOW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
