function redirectWhenAuthenticated(route = "/") {
  return (req, res, next) => {
    if (!req.authUser) {
      next();
      return;
    }

    res.redirect(route);
  };
}

module.exports = redirectWhenAuthenticated;
