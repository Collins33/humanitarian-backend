const request = require("request");
const moment = require("moment")
require("dotenv").config;
const REGISTER_URL = process.env.REGISTER_URL;
const SIMULATION_URL = process.env.SIMULATION_URL;
const SHORT_CODE = process.env.SHORT_CODE;
const MSISDN = process.env.MSISDN;
const CONFIRMATION_URL = process.env.CONFIRMATION_URL;
const VALIDATION_URL = process.env.VALIDATION_URL;
const PASS_KEY = process.env.PASS_KEY;
const LIPA_NA_MPESA_SHORTCODE = process.env.LIPA_NA_MPESA_SHORT_CODE

/**
 * @method get_access_token
 * @summary - generate the access token
 * @param request body, response body
 * @returns json message
 */
exports.get_access_token = (req, res, next) => {
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
        ConfirmationURL: CONFIRMATION_URL,
        ValidationURL: VALIDATION_URL
      }
    },
    function (error, response, body) {
      if (error) {
        res.status(500).json({
          message: "There was an error when generating the token"
        });
      } else {
        console.log(body);
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
  console.log('.......... STK Callback ..................')
  console.log(JSON.stringify(req.body.Body.stkCallback))
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

/**
 * @method simulate
 * @summary - save the payment confirmation
 * @param request body, response body
 * @returns json message
 */
exports.simulate = async (req, res, next) => {
  const token = req.authToken;
  const amount = req.body.amount;
  const auth = "Bearer " + token;
  console.log(amount)
  await request(
    {
      method: "POST",
      url: SIMULATION_URL,
      headers: {
        Authorization: auth
      },
      json: {
        ShortCode: SHORT_CODE,
        CommandID: "CustomerPayBillOnline",
        Amount: amount,
        Msisdn: MSISDN,
        BillRefNumber: "TestApi"
      }
    },
    function (error, response, body) {
      if (error) {
        res.status(500).json({
          message: "There was an error"
        });
      } else {
        console.log(body, "<><><><><><>>><><><><><><>><>");
      }
    }
  );
};


/**
 * @method lipa_na_mpesa
 * @summary - lipa na mpesa online
 * @param request body, response body
 * @returns json message
 */
exports.lipa_na_mpesa = (req, res, next) => {
  const token = req.authToken;
  const auth = "Bearer " + token;
  const amount = req.body.amount;
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
  const phoneNumber = req.body.phoneNumber

  let timestamp = moment().format('YYYYMMDDHHmmss')

  const password =new Buffer.from(LIPA_NA_MPESA_SHORTCODE + PASS_KEY + timestamp).toString('base64')
  request(
    {
      url: url,
      method: "POST",
      headers: {
        Authorization: auth
      },
      json: {
        "BusinessShortCode": LIPA_NA_MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount":amount,
        "PartyA":phoneNumber,
        "PartyB": LIPA_NA_MPESA_SHORTCODE,
        "PhoneNumber":phoneNumber,
        "CallBackURL":  CONFIRMATION_URL,
        "AccountReference": "Test", // account that is receiving the amount
        "TransactionDesc": "TestPay"
      }
    },
    function (error, response, body) {
      if (error) {
        res.status(500).json({
          message: "There was an error"
        });
      } else {
        res.status(200).json(body)
      }
    }
  )
}