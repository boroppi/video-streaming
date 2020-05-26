const port = 3000;
const app = require("./app");

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
