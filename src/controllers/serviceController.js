const Snip = require("../models/snipModel");

const submitSnip = async (req, res) => {
  const { content, title, disposable, expiryDate } = req.body;
  const { jwt } = req.cookies;

  const snip = new Snip(content, title, disposable === "true", expiryDate);
  const id = await snip.save(jwt);

  res.redirect(`/${id}`);
};

const deleteSnip = async (req, res) => {
  const { authUser } = req;
  const { id } = req.params;
  const { jwt } = req.cookies;

  await Snip.deleteById(id, jwt);

  res.redirect(`/u/${authUser.username}`);
};

module.exports = {
  submitSnip,
  deleteSnip,
};
