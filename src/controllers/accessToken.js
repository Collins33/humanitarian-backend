require("dotenv").config;

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
