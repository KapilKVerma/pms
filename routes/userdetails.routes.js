const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userdetails.model");
const multer = require("multer");

// == Multer Configuration ==
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/user-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Wrong file format!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// ====Routes====
// Get - User Details
router.route("/").get((req, res) => {
  const id = "5f6a74001592160b60c1903e";
  UserDetails.findById(id, (err, userdetail) => {
    if (err) res.status(400).json(err);
    else res.json(userdetail);
  });
});

// Create - User Details
router.route("/add").post((req, res) => {
  UserDetails.create(
    { firstname: req.body.firstname, lastname: req.body.lastname },
    (err, details) => {
      if (err) res.status(400).json(err);
      else res.json(details);
    }
  );
});

// Update - User Images
router
  .route("/:id/update/images")
  .post(upload.array("images", 3), (req, res) => {
    const userdetails = req.body;
    UserDetails.findByIdAndUpdate(
      req.params.id,
      {
        homeimage: req.files[0].fieldname + "-" + req.files[0].originalname,
        aboutmeimage: req.files[2].fieldname + "-" + req.files[2].originalname,
        contactmeimage:
          req.files[1].fieldname + "-" + req.files[1].originalname,
        profileimage: req.files[2].fieldname + "-" + req.files[2].originalname,
      },
      (err, userdetails) => {
        if (err) res.status(400).json(err);
        else res.json("User Details Updated!");
      }
    );
  });

// Update - User Personal Info
router.route("/:id/update/pi").post((req, res) => {
  console.log(req.body);
  const userdetails = req.body;
  UserDetails.findByIdAndUpdate(
    req.params.id,
    {
      firstname: userdetails.firstname,
      lastname: userdetails.lastname,
      email: userdetails.email,
      number: userdetails.number,
      address: {
        addressline1: userdetails.addressline1,
        addressline2: userdetails.addressline2,
        city: userdetails.city,
        postcode: userdetails.postcode,
      },
    },
    (err, userdetails) => {
      if (err) res.status(400).json(err);
      else res.json("Personal details have been updated!");
    }
  );
});

// Update - User About Me
router.route("/:id/update/am").put((req, res) => {
  if (!req.body.aboutme) res.json("Data not recieved.");
  else {
    console.log(req.body);
    const userdetails = req.body;
    UserDetails.findByIdAndUpdate(
      req.params.id,
      {
        aboutme: userdetails.aboutme,
        quote: userdetails.quote,
        dimensions: {
          height: userdetails.height,
          weight: userdetails.weight,
          eyes: userdetails.eyes,
          hair: userdetails.hair,
          bust: userdetails.bust,
          waist: userdetails.waist,
          hip: userdetails.hip,
        },
      },
      (err, userdetails) => {
        if (err) res.status(400).json(err);
        else res.json("User Details Updated!");
      }
    );
  }
});

module.exports = router;
