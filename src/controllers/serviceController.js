const Snip = require("../models/snipModel");

const submitSnip = async (req, res) => {
  const { content, title, disposable, expiryDate } = req.body;

  const snip = new Snip(content, title, disposable === "true", expiryDate);
  const id = await snip.save();

  res.redirect(`/${id}`);
};

module.exports = {
  submitSnip,
};
