const router = require("express").Router();

const {
  uploadProcess,
  deleteImage,
} = require("../controllers/upload.controller");

const uploadCloud = require("../config/cloudinary");



router.post(
  "/uploads",
  uploadCloud.array("images", 3),
  uploadProcess
);

router.post("/single", uploadCloud.single("image"), uploadProcess);

router.delete("/delete-image/:name", deleteImage);

module.exports = router;
