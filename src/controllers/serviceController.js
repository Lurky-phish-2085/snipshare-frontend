const Snip = require("../models/snipModel");

const submitSnip = async (req, res) => {
  const { content, title, isDisposable, expiryDate } = req.body;
  const snip = new Snip(content, title, isDisposable, expiryDate);
  const id = await snip.save();

  res.status(200).send({ redirectUrl: `/${id}` });
};

module.exports = {
  submitSnip,
};
