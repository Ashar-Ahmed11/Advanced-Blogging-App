const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { body, validationResult } = require('express-validator');


let success;
router.post(
  "/createcategory",
  [
    body('metaTitle').notEmpty().withMessage('Meta title is required'),
    body('metaDescription').notEmpty().withMessage('Meta description is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('coverImage').isURL().withMessage('Cover image must be a valid URL'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { metaTitle, metaDescription, title, description, coverImage } = req.body;

    try {
      const newCategory = new Category({
        metaTitle,
        metaDescription,
        title,
        description,
        coverImage,
      });

      await newCategory.save();
      res.status(200).json({ success: true, newCategory });
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);


router.get("/getcategories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});



router.put("/updatecategory/:id", async (req, res) => {
  try {
    const id = req.params.id
    const newCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    
    if(!newCategory) {
        res.status(404).json({success:false, error: "Not Found"})
    }

    res.status(201).json({ success: true, newCategory });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


router.delete("/deletecategory/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(id)

        if(!deleteCategory){
            res.status(404).json({success:false, error:"Not Found"})
        }
        res.status(201).json({ success: true, deleteCategory });

    } catch (error) {
         console.error("Error deleting category:", error);
    res.status(500).json({ success: false, error: "Server error" });
    }
})




module.exports = router;