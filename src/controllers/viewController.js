const serviceRoutes = require("../routes/serviceRoutes").routeUrls;
const Snip = require("../models/snipModel");

const index = (req, res) => {
  const submitSnipUrl = serviceRoutes.SUBMIT_SNIP;

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

module.exports = {
  index,
  snippet,
};
