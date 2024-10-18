const Snip = require("../models/snipModel");

const index = (req, res) => {
  res.render("index");
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
