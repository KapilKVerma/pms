const mongoose = require("mongoose");

const photoshootsSchema = new mongoose.Schema({
  name: String,
  url: String,
  views: Number,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images",
    },
  ],
});

const Photoshoots = mongoose.model("Photoshoots", photoshootsSchema);
module.exports = Photoshoots;
