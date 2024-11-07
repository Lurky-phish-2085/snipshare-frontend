const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const redirectWhenAuthenticated = require("../middlewares/redirectWhenAuthenticated");
const handler = require("../controllers/viewController");

const router = express.Router();

router.get("/", handler.index);
router.get("/login", redirectWhenAuthenticated(), handler.login);
router.get("/register", redirectWhenAuthenticated(), handler.register);
router.get("/profile", requireAuth(), handler.profile);
router.get("/u/:name", handler.authorSnips);
router.get("/:id/edit", requireAuth(), handler.snipEdit);
router.get("/:id", handler.snippet);

router.post("/:id", handler.snippet);

module.exports = router;
