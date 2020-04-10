// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  var hasSubscription = false;
  let thisCustomer = null;

  try {
    // Get filename from url parameter
    const file = event.queryStringParameters.file || '';
    var email = event.queryStringParameters.email || null;
    const token = event.queryStringParameters.token || null;

    var errorMessage = null;

    const jwt = require('jsonwebtoken');
    const loginSecretKey = process.env.JWT_SECRET;
    var tokenResult = null;
    var user = null;
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

    // Get the relevant static file    
    var fs = require('fs');
    var content = __dirname + '/../../data/content/' + file + '.md';
    var errormessage = null;
    content = fs.readFileSync(content, 'utf8');

    // Convert it to JSON
    var fm = require('front-matter');
    var data = fm(content);
    delete data.frontmatter;
    delete data.bodyBegin;

    if (tokenResult == true) {

      var meta = { user: {} };
      var stripeTools = require('../../lib/stripe');
      var user = new stripeTools(decodedUser.sub);
      var user = await user.getDetails();
      meta.user = user;

    }

    else {
      var customer = null;
    }

    // If customer is not subscriber, delete the body of the content item from the response
    if (tokenResult == false || meta.user.subscriptions.length == 0) {
      data.body = null;
      data.attributes.media_full = null;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, data: data, meta: meta, error: (tokenResult === false), message: null }, null, 3)
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: 500, data: null, meta: meta, error: true, message: err.toString() }, null, 3) }
  }
}
