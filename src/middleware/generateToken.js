const request = require("request");
require("dotenv").config;
const consumerKey = process.env.consumer_key;
const consumerSecret = process.env.consumer_secret;
const url = process.env.URL;

/**
 * @method get_access_token
 * @summary - generate the access token
 * @param request body, response body
 * @returns json message
 */

exports.generate_auth_token = async (req, res, next) => {
  try {
    const auth =
      "Basic " +
      new Buffer(consumerKey + ":" + consumerSecret).toString("base64");
    await request(
      {
        url: url,
        headers: {
          Authorization: auth
        }
      },
      function(error, response, body) {
        if (error) {
          res.status(500).json({
            message: "There was an error when generating the token"
          });
        } else {
          const bodyResponse = JSON.parse(body);
          req.authToken = bodyResponse.access_token;
          next();
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "There was an error"
    });
  }
};
