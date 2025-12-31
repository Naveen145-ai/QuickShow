const mongoose = require("mongoose");

const Video360Schema = new mongoose.Schema({
  name: { type: String, required: true },
  videoUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Video360", Video360Schema);
