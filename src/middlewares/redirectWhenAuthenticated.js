function redirectWhenAuthenticated(route = "/") {
  return (req, res, next) => {
    if (!req.authUser) next();

    res.redirect(route);
  };
}

module.exports = redirectWhenAuthenticated;