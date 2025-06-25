const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { body, validationResult } = require('express-validator');


let success;
router.post(
  "/createpost",
  [
    body('metaTitle').notEmpty().withMessage('Meta title is required'),
    body('metaDescription').notEmpty().withMessage('Meta description is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('coverImage').notEmpty().withMessage('Cover image is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { metaTitle, metaDescription, title, coverImage, description, category } = req.body;

    try {
      const newPost = new Post({
        metaTitle,
        metaDescription,
        title,
        coverImage,
        description,
        category,
      });

      await newPost.save();
      res.status(200).json({ success: true, newPost });
    } catch (error) {
      console.error("Error creating Post:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);





router.put("/updatepost/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updatePost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    
    if(!updatePost) {
        res.status(404).json({success:false, error: "Not Found"})
    }

    res.status(201).json({ success: true, updatedPost: updatePost });
  } catch (error) {
    console.error("Error updating Post:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});




router.get("/getpost", async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});




router.delete("/deletepost/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const deletePost = await Post.findByIdAndDelete(id)

        if(!deletePost){
            res.status(404).json({success:false, error:"Not Found"})
        }
        res.status(201).json({ success: true, deletePost });

    } catch (error) {
         console.error("Error deleting posts:", error);
    res.status(500).json({ success: false, error: "Server error" });
    }
})



router.get("/getcategorypost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const categoryPosts = await Post.find({ category: id })

    res.status(200).json({
      success: true,
      posts: categoryPosts
    });

  } catch (error) {
    console.error("Error fetching category posts:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




router.get('/getpostbyid/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, post });
  } catch (err) {
    console.error('Error fetching post by ID:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


module.exports = router;



module.exports = router;