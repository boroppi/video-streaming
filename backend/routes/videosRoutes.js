const express = require("express");
const videosController = require("./../controllers/videosController");

const router = express.Router();

//router.route("/").get(videosController.getAllVideos);

router.route("/:id").get(videosController.getVideo);

module.exports = router;
