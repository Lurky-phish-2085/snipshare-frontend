function customHeaders() {
  return (req, res, next) => {
    preventCaching(res);
    next();
  };
}

function preventCaching(res) {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
}

module.exports = customHeaders;
