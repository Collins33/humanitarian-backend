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
exports.get_access_token = async (req, res, next) => {
  const auth =
    "Basic " +
    new Buffer(consumer_key + ":" + consumer_secret).toString("base64");
  request(
    {
      url: url,
      headers: {
        Authorization: auth
      }
    },
    function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        console.log(body);
      }
    }
  );
};
