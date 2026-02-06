const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    text: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// ✅ FIXED PRE-SAVE HOOK (NO next)
postSchema.pre('save', function () {
  if (!this.text && !this.image) {
    throw new Error('Post must have text or image');
  }
});

module.exports = mongoose.model('Post', postSchema);
