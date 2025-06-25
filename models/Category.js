const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
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
  description: {
    type: String,
  },
  coverImage: {
    type: String, // You can store the image URL or file path
    required: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Category", CategorySchema);
