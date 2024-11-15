const express = require("express");
const handler = require("../controllers/authController");

const BASE = "/api/v1/auth";
const LOGIN = `${BASE}/login`;
const REGISTER = `${BASE}/register`;
const LOGOUT = `${BASE}/logout`;

const endpoints = {
  BASE,
  LOGIN,
  REGISTER,
  LOGOUT,
};

const router = express.Router();

router.post(LOGIN, handler.login);
router.post(REGISTER, handler.register);
router.get(LOGOUT, handler.logout);

module.exports = {
  router,
  endpoints,
};
