const express = require("express");
const handler = require("../controllers/authController");

const BASE = "/api/v1/auth";
const LOGIN = `${BASE}/login`;
const REGISTER = `${BASE}/register`;

const endpoints = {
  BASE,
  LOGIN,
  REGISTER,
};

const router = express.Router();

router.post(LOGIN, handler.login);
router.post(REGISTER, handler.register);

module.exports = {
  router,
  endpoints,
};
