const serviceRoutes = require("../routes/serviceRoutes").routeUrls;
const Snip = require("../models/snipModel");

const index = (req, res) => {
  const submitSnipUrl = serviceRoutes.SUBMIT_SNIP;

  res.render("index", { submitSnipUrl });
};

const snippet = async (req, res) => {
  const { id } = req.params;
  const snip = await Snip.findById(id);

  res.render("snippet", { snip });
};

module.exports = {
  index,
  snippet,
};
