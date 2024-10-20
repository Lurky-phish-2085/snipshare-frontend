const express = require("express");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(setDefaultHeaders());

app.use(require("./routes/viewRoutes"));
app.use(serviceRoutes.router);

app.use(notFoundPage());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

function setDefaultHeaders() {
  return (req, res, next) => {
    preventCaching(res);
    next();
  };
}

function preventCaching(res) {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
}

function notFoundPage() {
  return (req, res, next) => {
    res.status(404).render("notFound");
  };
}
