var sesAccessKey = process.env.MAIL_USER;
var sesSecretKey = process.env.MAIL_KEY;
var mailHost = process.env.MAIL_HOST;
var mailPort = process.env.MAIL_PORT;
var mailSender = process.env.MAIL_SENDER;




// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

    var hasSubscription = false;
    let thisCustomer = null;

    try {
        // Get filename from url parameter

        var token = event.queryStringParameters.token || null;

        const jwt = require('jsonwebtoken');
        const loginSecretKey = process.env.JWT_SECRET; //example generation: node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"                         
        var data = jwt.verify(token, loginSecretKey);
        
        Cryptr = require('cryptr');
        //const cryptr = new Cryptr(process.env.JWT_SECRET);
        //const email = cryptr.decrypt(data.sub);
        //data.sub = email;
        token = token = jwt.sign({ sub: data.sub }, loginSecretKey, { expiresIn: '7 days' });
        data = jwt.verify(token, loginSecretKey);
        var message = null;      
        message = 'Token validated.';



        return {
            statusCode: 200,

            body: JSON.stringify({ status: 200, data, error: false, message: message }, null, 3)
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }




    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ status: 500, data: data, error: true, message: err.toString() }, null, 3) }
    }
}
