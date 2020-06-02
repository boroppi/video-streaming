const express = require("express");
const videosController = require("./../controllers/videosController");

const router = express.Router();

router.route("/").get(videosController.getAllVideos);

router.route("/:title").get(videosController.getVideo);

router.route("/").post(videosController.uploadVideo);

module.exports = router;
