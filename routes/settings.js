const express = require("express");
const router = express.Router();
const Settings = require("../models/BasicSetting");

// GET - fetch settings
router.get("/getsettings", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// POST - create
router.post("/createsettings", async (req, res) => {
  try {
    const { metaTitle, metaDescription, email, phone, address } = req.body;

    const newSettings = new Settings({
      metaTitle,
      metaDescription,
      email,
      phone,
      address,
    });

    await newSettings.save();
    res.status(201).json({ success: true, settings: newSettings });
  } catch (error) {
    console.error("Error creating settings:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});



router.put("/updatesettings", async (req, res) => {
  try {
    const id = "6858951147cb59f9beb45f5a"
    const updateSettings = await Settings.findByIdAndUpdate(id, req.body, { new: true });
    
    if(!updateSettings) {
        res.status(404).json({success:true, error: "Not Found"})
    }

    res.status(201).json({ success: true, settings: updateSettings });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
