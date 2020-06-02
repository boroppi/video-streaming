const fs = require("fs");
const pool = require("../db/connect");

const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);

const REDIS_EXPIRY_DELAY = 60 * 60 * 48; // 2 days

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await pool.query("SELECT * FROM videos");

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: videos.rows
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      requestedAt: req.requestTime,
      data: error.message
    });
    console.log(error.message);
  }
};

exports.getVideo = async (req, res) => {
  try {
    let { title } = req.params;
    const videoOnRedis = await getAsync(title);
    let videoId = "";

    if (videoOnRedis) {
      videoId = videoOnRedis.id;
    } else {
      let deslugyfiedTitle = title.replace(/-/g, " ").toLowerCase();

      const video = await pool.query(
        "SELECT id FROM videos WHERE LOWER(title) = $1",
        [deslugyfiedTitle]
      );

      const success = await setAsync(
        title,
        REDIS_EXPIRY_DELAY,
        JSON.stringify(vide.rows[0])
      );
      console.log("success setting to redis", { success });

      videoId = video.rows[0].id;
    }

    const path = `assets/${videoId}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (error) {
    res.status(404).json({
      status: "failure",
      requestedAt: req.requestTime,
      data: error.message.split(",")[0]
    });
    console.log(error.message);
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    if (req.files) console.log(req.files);
  } catch (error) {
    res.status(500).json({
      status: "failure",
      requestedAt: req.requestTime,
      data: error.message
    });
    console.log(error.message);
  }
};
