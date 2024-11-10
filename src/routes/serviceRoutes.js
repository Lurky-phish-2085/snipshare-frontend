const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const handler = require("../controllers/serviceController");

const BASE = "/api/v1/service";
const SUBMIT_SNIP = `${BASE}/submitSnip`;
const PATCH_SNIP = `${BASE}/patchSnip`;
const DELETE_SNIP = `${BASE}/deleteSnip`;

const endpoints = {
  BASE,
  SUBMIT_SNIP,
  PATCH_SNIP,
  DELETE_SNIP,
};

const router = express.Router();

router.post(SUBMIT_SNIP, handler.submitSnip);
router.post(PATCH_SNIP + "/:id", requireAuth(), handler.patchSnip);
router.post(DELETE_SNIP + "/:id", requireAuth(), handler.deleteSnip);

module.exports = {
  router,
  endpoints,
};
