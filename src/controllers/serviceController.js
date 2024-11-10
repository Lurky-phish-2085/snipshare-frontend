const Snip = require("../models/snipModel");

const submitSnip = async (req, res) => {
  const { content, title, disposable, expiryDate } = req.body;
  const { jwt } = req.cookies;

  const snip = new Snip(content, title, disposable === "true", expiryDate);
  const id = await snip.save(jwt);

  res.redirect(`/${id}`);
};

const patchSnip = async (req, res) => {
  const { jwt } = req.cookies;
  const { id } = req.params;
  const update = req.body;

  await Snip.update(id, jwt, update);

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
  patchSnip,
  deleteSnip,
};
