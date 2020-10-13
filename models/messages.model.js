const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contactnumber: String,
    message: String,
    date: String,
    time: String,
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
