const express = require("express");
const router = express.Router();

const accessTokenController = require("../controllers/accessToken");

router.get("/accessToken", accessTokenController);
