const express = require("express");
const router = express.Router();

const accessTokenController = require("../controllers/accessToken");
const accessTokenMiddleware = require("../middleware/generateToken");

router.get(
  "/",
  accessTokenMiddleware.generate_auth_token,
  accessTokenController.get_access_token
);

module.exports = router;
