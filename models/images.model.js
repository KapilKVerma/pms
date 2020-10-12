const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  name: String,
  url: String,
  views: Number,
});

const Images = mongoose.model("Images", imagesSchema);

module.exports = Images;
