const express = require("express");

const videosRouter = require("./routes/videosRoutes");

const app = express();

const clientOrigin = `http://localhost:8080`;

// MIDDLEWARES
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", clientOrigin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ROUTES
app.use("/videos", videosRouter);

module.exports = app;
