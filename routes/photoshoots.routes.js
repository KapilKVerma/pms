const router = require("express").Router();
const Photoshoots = require("../models/photoshoots.model");
const UserDetails = require("../models/userdetails.model");
const multer = require("multer");

// == Multer configuration ==
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/photoshoots");
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
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

// ==== Routes ====
// Get - All Photoshoots
router.route("/").get((req, res) => {
  Photoshoots.find({}, (err, photoshoot) => {
    if (err) {
      res.status(400).json("Error:" + err);
    } else {
      res.json(photoshoot);
    }
  });
});

// Get - Photoshoot By Id
router.route("/:id").get((req, res) => {
  Photoshoots.findById(req.params.id, (err, photoshoot) => {
    if (err) {
      res.status(400).json("Error:" + err);
    } else {
      res.json(photoshoot);
    }
  });
});
//  Photoshoot - Update views
router.route("/:id/updateviews").post((req, res) => {
  Photoshoots.findByIdAndUpdate(
    req.params.id,
    { views: req.body.views },
    (err, photoshoot) => {
      if (err) res.status(400).json({ msg: err.message });
      else res.json({ mag: "Image views updated" });
    }
  );
});
// Create - New Photoshoot and Add it to UserDetails
router.route("/add").post(upload.single("url"), (req, res) => {
  const userId = "5f6a74001592160b60c1903e";
  const photoshoot = {
    name: req.body.name,
    url: req.file.fieldname + "-" + req.file.originalname,
    views: "",
  };
  Photoshoots.create(photoshoot, (err, photoshoot) => {
    if (err) {
      res.json("Error:" + err);
    } else {
      UserDetails.findById(userId, (err, details) => {
        if (err) res.status(400).json(err);
        else {
          details.photoshoots.push(photoshoot);
          details.save();
          res.json("New Photoshoot Created!");
        }
      });
    }
  });
});

// Update - Photoshoot
router.route("/:id/update").post(upload.single("url"), (req, res) => {
  const photoshoot = {
    name: req.body.name,
    url: req.file.fieldname + "-" + req.file.originalname,
  };

  Photoshoots.findByIdAndUpdate(
    req.params.id,
    photoshoot,
    (err, photoshoot) => {
      if (err) res.status(400).json(err);
      else res.json("Photoshoot Updated");
    }
  );
});

// Delete - Photoshoot and from Userdetails
router.route("/:id/delete").post((req, res) => {
  const userId = "5f6a74001592160b60c1903e";
  const photoshootId = req.params.id;

  Photoshoots.findByIdAndDelete(photoshootId, (err, photoshoot) => {
    if (err) {
      res.status(400).json("Error:" + err);
    } else {
      console.log("Photoshoot Deleted");
      res.json("Photoshoot Deleated");
    }
  });

  UserDetails.findById(userId, (err, details) => {
    if (err) console.log(err);
    else {
      console.log(details.photoshoots);
      details.photoshoots = details.photoshoots.filter((value) => {
        return value != photoshootId;
      });
      console.log(details.photoshoots);
      details.save();
    }
  });
});

module.exports = router;
