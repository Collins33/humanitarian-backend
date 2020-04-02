const express = require("express");
const router = express.Router();

const accessTokenController = require("../controllers/accessToken");

router.get("/", accessTokenController.get_access_token);

module.exports = router;
