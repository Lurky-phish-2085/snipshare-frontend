const express = require("express");
const handler = require("../controllers/webpagesController");

const router = express.Router();

router.get("/", handler.index);
router.get("/:id", handler.snippetViewPage);

module.exports = router;
