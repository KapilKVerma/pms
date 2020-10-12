const router = require("express").Router();
const Messages = require("../models/messages.model");
const UserDetails = require("../models/userdetails.model");
const nodemailer = require("nodemailer");

// == Email Configuration ==
const sendMail = (message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kapilkumaarverma@gmail.com",
      pass: "OmNamahShivaya!!!",
    },
  });

  let mailOptions = {
    from: `${message.email}`,
    to: "youmustvisit_kkv@yahoo.com, sharma.nishmodel@gmail.com", // TODO: email receiver
    subject: "New Message",
    html: `<div>Hi, Nisha! You have a new message.</div>
    <p><h3>${message.message}</h3>
    <div>From:<div>
      <div>${message.name}</div>
      <div>${message.contactnumber}</div>
      <div>${message.email}</div></p>`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurs");
    }
    return console.log("Email sent!!!");
  });
};

// ==== Routes ====
// Get - Message By Id
router.route("/:id").get((req, res) => {
  Messages.findById(req.params.id, (err, message) => {
    if (err) res.status(400).json("Error:" + err);
    else res.json(message);
  });
});

// Create - New Message
router.route("/add").post((req, res) => {
  const message = req.body;
  sendMail(message);
  Messages.create(req.body, (err, message) => {
    if (err) {
      res.status(400).json("Error:" + err);
    } else {
      const id = "5f6a74001592160b60c1903e";
      UserDetails.findById(id, (err, details) => {
        if (err) res.status(400).json(err);
        else {
          details.emailmessage.push(message);
          details.save();
          res.json(details);
        }
      });
    }
  });
});

// Delete - Message By Id
router.route("/:id/delete").delete((req, res) => {
  const userId = "5f6a74001592160b60c1903e";
  const messageId = req.params.id;

  Messages.findByIdAndDelete(messageId, (err, res) => {
    if (err) console.log(err);
    else console.log("Message Deleted!");
  });

  UserDetails.findById(userId, (err, details) => {
    if (err) console.log(err);
    else {
      details.emailmessage = details.emailmessage.filter((value) => {
        return value != messageId;
      });
      details.save();
    }
  });
});

module.exports = router;
