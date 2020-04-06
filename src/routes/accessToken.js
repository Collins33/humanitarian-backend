const express = require("express");
const router = express.Router();

const accessTokenController = require("../controllers/accessToken");
const accessTokenMiddleware = require("../middleware/generateToken");

router.get(
  "/token",
  accessTokenMiddleware.generate_auth_token,
  accessTokenController.get_access_token
);

router.get(
  "/register_url",
  accessTokenMiddleware.generate_auth_token,
  accessTokenController.register_payment_urls
);

module.exports = router;
