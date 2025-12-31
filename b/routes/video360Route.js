const express = require("express");
const multer = require("multer");
const { uploadVideo360, getAllVideos360 } = require("../controllers/video360Controller");

const router = express.Router();

// multer temporary storage
const upload = multer({ 
  dest: "temp/",
  // Allow other fields (like 'title') to pass through
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit for videos
});

// Upload route - accepts 'video' file and 'title' text field
router.post("/upload", (req, res, next) => {
  // Debug: Log incoming request info
  console.log("Content-Type:", req.headers['content-type']);
  
  upload.single("video")(req, res, (err) => {
    if (err) {
      // Handle multer errors
      console.error("Multer error:", err);
      console.error("Error code:", err.code);
      console.error("Error field:", err.field);
      
      if (err.message && err.message.includes("Unexpected field")) {
        return res.status(400).json({
          success: false,
          message: `Multer error: ${err.message}. Field received: ${err.field || 'unknown'}. Make sure the file field is named exactly 'video' (case-sensitive) and you're using form-data in Postman.`,
          receivedField: err.field || 'unknown'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "File upload error",
        error: err.code || "UPLOAD_ERROR",
        field: err.field || 'unknown'
      });
    }
    
    // Debug: Log what was received
    console.log("File received:", req.file ? req.file.fieldname : "none");
    console.log("Body fields:", Object.keys(req.body));
    
    next();
  });
}, uploadVideo360);

// Get all videos
router.get("/all", getAllVideos360);

module.exports = router;
