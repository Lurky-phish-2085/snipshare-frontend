const serviceRouteEndpoints = require("../routes/serviceRoutes").endpoints;
const authRouteEndpoints = require("../routes/authRoutes").endpoints;
const Snip = require("../models/snipModel");

const index = (req, res) => {
  const submitSnipUrl = serviceRouteEndpoints.SUBMIT_SNIP;
  const logoutUrl = authRouteEndpoints.LOGOUT;

  const { authUser } = req;

  res.render("index", { submitSnipUrl, authUser, logoutUrl });
};

const snippet = async (req, res) => {
  const logoutUrl = authRouteEndpoints.LOGOUT;

  const { id } = req.params;
  const { dispose } = req.body;
  const { authUser } = req;

  let snip = await Snip.findById(id, { metadataOnly: true });

  if (snip) {
    if (!snip.isDisposable || dispose) {
      snip = await Snip.findById(id);
      snip.isDisposable = false;
    }
  }
  res.render("snippet", { id, snip, authUser, logoutUrl });
};

const authorSnips = async (req, res) => {
  const deleteUrl = serviceRouteEndpoints.DELETE_SNIP;
  const logoutUrl = authRouteEndpoints.LOGOUT;

  const { authUser } = req;
  const { name } = req.params;

  const snips = await Snip.findByAuthor(name);

  res.render("authorSnips", {
    snips,
    name,
    authUser,
    deleteUrl,
    logoutUrl,
  });
};

const snipEdit = async (req, res) => {
  const patchSnipUrl = serviceRouteEndpoints.PATCH_SNIP;
  const logoutUrl = authRouteEndpoints.LOGOUT;
  const { id } = req.params;
  const { authUser } = req;

  const snip = await Snip.findById(id);

  res.render("snipEdit", {
    snip,
    id,
    authUser,
    patchSnipUrl,
    logoutUrl,
  });
};

const login = (req, res) => {
  const loginUrl = authRouteEndpoints.LOGIN;

  res.render("login", { loginUrl });
};

const register = (req, res) => {
  const registrationUrl = authRouteEndpoints.REGISTER;

  res.render("register", { registrationUrl });
};

const profile = (req, res) => {
  const logoutUrl = authRouteEndpoints.LOGOUT;

  const { authUser } = req;

  res.render("profile", { authUser, logoutUrl });
};

module.exports = {
  index,
  snippet,
  authorSnips,
  snipEdit,
  login,
  register,
  profile,
};
