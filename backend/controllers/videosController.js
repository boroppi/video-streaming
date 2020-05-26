const fs = require("fs");
const pool = require("../db/connect");

/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or description"
    });
  }
  next();
};

 */
exports.getAllVideos = (req, res) => {
  // Open Db Connection
  let db = connect(connectionModes.readOnly);

  let sql = `SELECT * FROM restaurant`;

  let restaurants = [];

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.send(`Error fetching the restaurants: ${err.message}`);
    }

    restaurants = rows;
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: restaurants.length,
      data: {
        restaurants
      }
    });
  });

  // close the database connection
  closeDbConnection(db);
};

exports.getVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await pool.query("SELECT * FROM videos WHERE id = $1", [id]);

    const path = `assets/${video.rows[0].id}.mp4`;
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
