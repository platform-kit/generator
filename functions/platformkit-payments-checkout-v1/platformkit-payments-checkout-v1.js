// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const token = event.queryStringParameters.token || null;
  var email = event.queryStringParameters.email || null;
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

    var stripeTools = require('./lib/stripe/stripe');    
    var cartTools = require('./lib/cart/cart');
    if (decodedUser != null) {
      var user = new stripeTools(decodedUser.sub);
    }
    else {
      var user = null;
    }

    var id = null;
    if (user != null) {
      id = (await user.getDetails());
      id = id.customer_identities.stripe[id.customer_identities.stripe.length - 1];
    }
    

    var cart = new cartTools();
    var error = false;
    var message = null;
    
    var stripeItems = await cart.decode(items);
    
    var product = stripeItems[0];
    var plan = stripeItems[1];
    



    
    
    var data = {items: [{plan: await plan.generateId() }]};
  
    var successUrl = process.env.APP_URL + '/success?productId=' + product.id + '&planId=' + await plan.generateId();
    successUrl = successUrl.replace('//success', '/success');

    if (id != null) {
      var session = await (async () => {

        return await stripe.checkout.sessions.create({
          customer: id,
          // mode: 'subscription',
          payment_method_types: ['card'],
          subscription_data: data,
          success_url: successUrl,
          cancel_url: process.env.APP_URL
        });
      })();
    }

    if (email != null) {
      var session = await (async () => {


        return await stripe.checkout.sessions.create({
          customer_email: email,
          // mode: 'subscription',
          payment_method_types: ['card'],     
          subscription_data: data,
          success_url: successUrl,
          cancel_url: process.env.APP_URL
        });
      })();
    }
    else {
      var session = await (async () => {
        return await stripe.checkout.sessions.create({
          // mode: 'subscription',
          payment_method_types: ['card'],        
          subscription_data: data,
          success_url: successUrl,
          cancel_url: process.env.APP_URL
        });
      })();
    }

    data = { sessionID: session.id, data: data };

    return {
      statusCode: 200,

      body: JSON.stringify({ status: 200, data, error: error, message: message, meta: { user: user } }, null, 3)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  }
  catch (err) {

    console.log(err);

    return {
      statusCode: 500,

      body: JSON.stringify({ status: 500, data: null, error: true, message: err, meta: { user: user } }, null, 3)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  }

}