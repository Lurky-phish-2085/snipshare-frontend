const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const handler = require("../controllers/serviceController");

const BASE = "/api/v1/service";
const SUBMIT_SNIP = `${BASE}/submitSnip`;
const DELETE_SNIP = `${BASE}/deleteSnip`;

const endpoints = {
  BASE,
  SUBMIT_SNIP,
  DELETE_SNIP,
};

const router = express.Router();

router.post(SUBMIT_SNIP, handler.submitSnip);
router.post(DELETE_SNIP + "/:id", requireAuth(), handler.deleteSnip);

module.exports = {
  router,
  endpoints,
};
