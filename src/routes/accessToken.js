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

router.get(
  "/simulate",
  accessTokenMiddleware.generate_auth_token,
  accessTokenController.simulate
);
router.post("/confirmation", accessTokenController.payment_confirmation);
router.post("/validation_url", accessTokenController.payment_validation);

module.exports = router;
