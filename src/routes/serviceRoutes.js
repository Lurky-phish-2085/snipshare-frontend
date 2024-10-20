const express = require("express");
const handler = require("../controllers/serviceController");

const BASE = "/api/v1/service";
const SUBMIT_SNIP = `${BASE}/submitSnip`;

const routeUrls = {
  BASE,
  SUBMIT_SNIP,
};

const router = express.Router();

router.post(SUBMIT_SNIP, handler.submitSnip);

module.exports = {
  router,
  routeUrls,
};
