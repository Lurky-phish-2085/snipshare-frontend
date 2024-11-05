const Snip = require("../models/snipModel");

const submitSnip = async (req, res) => {
  const { content, title, disposable, expiryDate } = req.body;
  const { jwt } = req.cookies;

  const snip = new Snip(content, title, disposable === "true", expiryDate);
  const id = await snip.save(jwt);

  res.redirect(`/${id}`);
};

module.exports = {
  submitSnip,
};
