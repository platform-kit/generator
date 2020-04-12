// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const token = event.queryStringParameters.token || null;
  const items = event.queryStringParameters.items || null;

  const jwt = require('jsonwebtoken');
  const loginSecretKey = process.env.JWT_SECRET;
  var tokenResult = null;
  var decodedUser = null;


  try {

  if (token != null) {
    var tokenData = jwt.verify(token, loginSecretKey, function (err, decoded) {
      if (err) {
        tokenResult = false;
        errorMessage = 'Invalid token.';

      }
      else {
        tokenResult = true;
        decodedUser = decoded;
        email = decoded.sub;
      }
    });
  }

  var stripeTools = require('../../lib/stripe');
  var productTools = require('../../lib/product');
  var cartTools = require('../../lib/cart');
  if(decodedUser != null){
    var user = new stripeTools(decodedUser.sub);
  }
  else {
    var user = null;
  }
  
  var cart = new cartTools();
  var error = false;
  var message = null;
  var lineItems = cart.getItemsForCheckout(items);
  var data = lineItems;

  
    

  var session = await (async () => {
      return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: process.env.APP_URL,
        cancel_url: process.env.APP_URL
      });
    })();
    
  
  
  data = {sessionID: session.id, data: data};


  return {
    statusCode: 200,

    body: JSON.stringify({ status: 200, data, error: error, message: message, meta: {user: user} }, null, 3)
    // // more keys you can return:
    // headers: { "headerName": "headerValue", ... },
    // isBase64Encoded: true,
  }
}
catch (err){

  return {
    statusCode: 500,

    body: JSON.stringify({ status: 500, data: null, error: true, message: err, meta: {user: user} }, null, 3)
    // // more keys you can return:
    // headers: { "headerName": "headerValue", ... },
    // isBase64Encoded: true,
  }
}

}