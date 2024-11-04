const serviceRouteEndpoints = require("../routes/serviceRoutes").endpoints;
const authRouteEndpoints = require("../routes/authRoutes").endpoints;
const Snip = require("../models/snipModel");

const index = (req, res) => {
  const submitSnipUrl = serviceRouteEndpoints.SUBMIT_SNIP;

  res.render("index", { submitSnipUrl });
};

const snippet = async (req, res) => {
  const { id } = req.params;
  const { dispose } = req.body;

  let snip = await Snip.findById(id, { metadataOnly: true });

  if (snip) {
    if (!snip.isDisposable || dispose) {
      snip = await Snip.findById(id);
      snip.isDisposable = false;
    }
  }
  res.render("snippet", { id, snip });
};

const login = (req, res) => {
  const loginUrl = authRouteEndpoints.LOGIN;

  res.render("login", { loginUrl });
};

const register = (req, res) => {
  const registrationUrl = authRouteEndpoints.REGISTER;

  res.render("register", { registrationUrl });
};

module.exports = {
  index,
  snippet,
  login,
  register,
};
