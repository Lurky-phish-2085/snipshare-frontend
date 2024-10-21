const express = require("express");
const handler = require("../controllers/viewController");

const router = express.Router();

router.get("/", handler.index);
router.get("/:id", handler.snippet);
router.post("/:id", handler.snippet);
router.get("/auth/login", handler.login);
router.get("/auth/register", handler.register);

module.exports = router;
