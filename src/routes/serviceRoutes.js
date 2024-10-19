const express = require("express");
const handler = require("../controllers/serviceController");

const router = express.Router();

router.post("/api/v1/service/submitSnip", handler.submitSnip);

module.exports = router;
