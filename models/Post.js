const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // URL or path to the post's cover image
    required: false,
  },
  description: {
    type: String, // Rich text content from JoditEditor
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to which category the post belongs
    required: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);
