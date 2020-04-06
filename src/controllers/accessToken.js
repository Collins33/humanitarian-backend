const request = require("request");
require("dotenv").config;
const REGISTER_URL = process.env.REGISTER_URL;
const SHORT_CODE = process.env.SHORT_CODE;

/**
 * @method get_access_token
 * @summary - generate the access token
 * @param request body, response body
 * @returns json message
 */
exports.get_access_token = async (req, res, next) => {
  const token = req.authToken;
  res.status(200).json({
    message: "Token was generated",
    token
  });
};

/**
 * @method get_access_token
 * @summary - generate the access token
 * @param request body, response body
 * @returns json message
 */
exports.register_payment_urls = async (req, res, next) => {
  const token = req.authToken;
  const bearerToken = "Bearer " + token;
  await request(
    {
      url: REGISTER_URL,
      method: "POST",
      headers: {
        Authorization: bearerToken
      },
      json: {
        ShortCode: SHORT_CODE,
        ResponseType: "Complete",
        ConfirmationURL: "http://41.80.97.164:4000/confirmation",
        ValidationURL: "http://41.80.97.164:4000/validation_url"
      }
    },
    function(error, response, body) {
      if (error) {
        res.status(500).json({
          message: "There was an error when generating the token"
        });
      } else {
        res.status(200).json({
          message: "Successfully added the url"
        });
      }
    }
  );
};

/**
 * @method confirmation
 * @summary - save the payment confirmation
 * @param request body, response body
 * @returns json message
 */
exports.payment_confirmation = (req, res, next) => {
  console.log(req.body, "<><><><><><><>>CONFIRMATION<<><><><>");
};

/**
 * @method validation
 * @summary - save the payment confirmation
 * @param request body, response body
 * @returns json message
 */
exports.payment_validation = (req, res, next) => {
  console.log(req.body, "<><><><><><><>>VALIDATION<<><><><>");
};
