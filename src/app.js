const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const customHeaders = require("./middlewares/customHeaders");
const notFoundPage = require("./middlewares/notFoundPage");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(customHeaders());
app.use(auth());

app.use(require("./routes/viewRoutes"));
app.use(authRoutes.router);
app.use(serviceRoutes.router);

app.use(notFoundPage());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
