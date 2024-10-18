const express = require("express");
const handler = require("../controllers/viewController");

const router = express.Router();

router.get("/", handler.index);
router.get("/:id", handler.snippet);

module.exports = router;
