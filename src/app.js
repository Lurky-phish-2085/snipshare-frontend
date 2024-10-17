const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(require("./routes/webpagesRoutes"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
