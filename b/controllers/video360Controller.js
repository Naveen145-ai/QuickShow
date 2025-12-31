const Video360 = require("../models/Video360Model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// UPLOAD VIDEO
exports.uploadVideo360 = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded"
      });
    }

    // Ensure temp dir exists (multer writes here)
    const tempDir = path.dirname(req.file.path);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "360videos",
      resource_type: "video",
      chunk_size: 6_000_000
    });

    // Save to DB - use 'title' from body, or 'name', or fallback to filename
    const newVideo = await Video360.create({
      name: req.body.title || req.body.name || req.file.originalname,
      videoUrl: uploadResult.secure_url
    });

    res.json({
      success: true,
      message: "Video uploaded successfully",
      data: newVideo
    });
  } catch (error) {
    console.error("Video360 upload failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload video",
      error: error.message
    });
  } finally {
    // Clean up temp file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, () => {});
    }
  }
};

// GET ALL VIDEOS
exports.getAllVideos360 = async (req, res) => {
  try {
    const videos = await Video360.find().sort({ uploadedAt: -1 });
    res.json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch videos" });
  }
};
