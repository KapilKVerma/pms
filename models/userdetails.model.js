const mongoose = require("mongoose");

const userdetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  aboutme: String,
  quote: String,
  number: String,
  homeimage: String,
  aboutmeimage: String,
  contactmeimage: String,
  profileimage: String,
  address: {
    addressline1: String,
    addressline2: String,
    city: String,
    postcode: String,
  },
  email: String,
  emailmessage: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
  dimensions: {
    height: Number,
    weight: Number,
    eyes: Number,
    hair: Number,
    bust: Number,
    waist: Number,
    hip: Number,
  },
  photoshoots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photoshoots",
    },
  ],
});

const UserDetails = mongoose.model("UserDetails", userdetailsSchema);
module.exports = UserDetails;
