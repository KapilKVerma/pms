const router = require("express").Router();
const Images = require("../models/images.model");
const Photoshoots = require("../models/photoshoots.model");
const multer = require("multer");
const fs = require("fs");

// == Multer configuration ==
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
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
    fileSize: 1024 * 1024 * 40,
  },
  fileFilter: fileFilter,
});

// ==== Routes ====
// Get - All Images
router.route("/").get((req, res) => {
  Images.find({}, (err, images) => {
    if (err) res.json(err);
    res.json(images);
  });
});

// Get - Image by Id
router.route("/:id").get((req, res) => {
  Images.findById(req.params.id, (err, image) => {
    if (err) res.json(err);
    res.json(image);
  });
});

// Create - New Image & Adding it to the Photoshoot
router.route("/add").post(upload.single("url"), (req, res) => {
  const photoshootId = req.body.photoshootId;
  const Image = {
    name: req.body.name,
    url: req.file.fieldname + "-" + req.file.originalname,
    views: "",
  };
  Images.create(Image, (err, image) => {
    if (err) res.status(400).json(err);
    else {
      Photoshoots.findById(photoshootId, (err, photoshoot) => {
        if (err) res.status(400).json(err);
        else {
          photoshoot.images.push(image);
          photoshoot.save();
          res.json("New Images Created and added to " + `${photoshoot.name}`);
        }
      });
    }
  });
});
// Image - Update views
router.route("/:id/updateviews").post((req, res) => {
  console.log(req.body.views);

  Images.findByIdAndUpdate(
    req.params.id,
    { views: req.body.views },
    (err, image) => {
      if (err) res.status(400).json({ msg: err.message });
      else res.json({ mag: "Image views updated" });
    }
  );
});

// Delete - Image and from Photoshoot.
router.route("/:id/delete").post((req, res) => {
  const photoshootId = req.body.id;
  const imageId = req.params.id;

  Images.findByIdAndDelete(req.params.id, (err, image) => {
    if (err) res.json(err);
    else {
      try {
        const imagePath = "./public/images/" + image.url;
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.log(err);
      }
      console.log("Image Deleted!");
      res.json("Image Deleted");
    }
  });

  Photoshoots.findById(photoshootId, (err, photoshoot) => {
    if (err) res.status(400).json(err);
    else {
      photoshoot.images;
      photoshoot.images = photoshoot.images.filter((value) => {
        return value != imageId;
      });
      photoshoot.save();
    }
  });
});

module.exports = router;
