function requireAuth() {
  return (req, res, next) => {
    if (req.authUser) {
      next();
      return;
    }

    res.redirect("/login");
  };
}

module.exports = requireAuth;
