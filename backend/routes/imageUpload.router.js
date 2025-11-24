const express = require("express");
const router = express.Router();

const upload = require("../mutler");
const Restaurant = require("../models/restaurent.model");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; 
    const restaurant = await Restaurant.create({
      name: req.body.name,
      image: imageUrl,
    });
    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;