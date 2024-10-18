const Snip = require("../models/snipModel");

const index = (req, res) => {
  res.render("index");
};

const snippetViewPage = async (req, res) => {
  const { id } = req.params;
  const snip = await Snip.findById(id);

  res.render("snippetView", { snip });
};

module.exports = {
  index,
  snippetViewPage,
};
