const Snip = require("../models/snipModel");

const index = (req, res) => {
  res.render("index");
};

const snippetViewPage = async (req, res) => {
  const { id } = req.params;

  const retrievedSnip = await Snip.findById(id);
  const snip = JSON.stringify(retrievedSnip);

  res.render("snippetView", { snip });
};

module.exports = {
  index,
  snippetViewPage,
};
