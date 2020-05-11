const request = require("request");
const LIPA_NA_MPESA_URL = process.env.LIPA_NA_MPESA_URL;
const PASS_KEY = process.env.PASS_KEY;
const LIPA_NA_MPESA_SHORTCODE = process.env.LIPA_NA_MPESA_SHORT_CODE;
const CONFIRMATION_URL = process.env.CONFIRMATION_URL;

exports.lipa_na_mpesa_online = (token, amount, phoneNumber)=>{
  const auth = "Bearer " + token;
  let timestamp = moment().format('YYYYMMDDHHmmss');


  const password =new Buffer.from(LIPA_NA_MPESA_SHORTCODE + PASS_KEY + timestamp).toString('base64');

  request({
    url: LIPA_NA_MPESA_URL,
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
  })
}