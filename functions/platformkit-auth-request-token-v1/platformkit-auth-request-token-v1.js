var sesAccessKey = process.env.MAIL_USER;
var sesSecretKey = process.env.MAIL_KEY;
var mailHost = process.env.MAIL_HOST;
var mailPort = process.env.MAIL_PORT;
var mailSender = process.env.MAIL_SENDER;

console.log(process.env.APP_DOMAIN);
console.log(process.env.APP_URL);
console.log(process.env.API_URL);
console.log(process.env.MAIL_USER);
console.log(process.env.MAIL_KEY);
console.log(process.env.MAIL_HOST);
console.log(process.env.MAIL_PORT);
console.log(process.env.MAIL_SENDER);


// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

    var hasSubscription = false;
    let thisCustomer = null;

    try {
        // Get filename from url parameter

        const email = event.queryStringParameters.email || null;
        const redirect = event.queryStringParameters.redirect || '';
        var data = null;
        var message = null;
        let token = null;
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        const encryptedEmail = cryptr.encrypt(email);


        const jwt = require('jsonwebtoken');
        const loginSecretKey = process.env.JWT_SECRET; //example generation: node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
        const jwtOptions = {
            issuer: process.env.APP_DOMAIN,
            audience: process.env.APP_DOMAIN,
            algorithm: 'HS256',
            expiresIn: '2 days',
        };


        if (email != null) {

            token = jwt.sign({ sub: email }, loginSecretKey, { expiresIn: '1h' });
        };

        message = 'Check your e-mail for login instructions.' + token;

        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');

        if (process.env.MAIL_TRANSPORT == 'nodemailer-mailgun-transport' ) {
            console.log(123);
            const mg = require('nodemailer-mailgun-transport');
            var transporter = nodemailer.createTransport(
                mg(
                {auth: {
                    api_key: process.env.MAIL_API_KEY,
                    domain: process.env.MAIL_DOMAIN
                }})
           );
        }
        else if (process.env.MAIL_SERVICE != null) {
            var transporter = nodemailer.createTransport({
                service: process.env.MAIL_SERVICE, // no need to set host or port etc.
                auth: {
                    user: sesAccessKey,
                    pass: sesSecretKey
                }
           });
        }
        else {
            var transporter = nodemailer.createTransport(smtpTransport({
                host: mailHost,
                port: mailPort,
                //secure: true,
                auth: {
                    user: sesAccessKey,
                    pass: sesSecretKey
                }
            }));
        }

        var text = 'To log in to ' + process.env.APP_DOMAIN + ', go to this link: ' + process.env.APP_URL + '?token=' + token + "Your login token is:  " + token;
        var html = "<br><a href='" + process.env.APP_URL + redirect + '?token=' + token + "'>Click here to log in to " + process.env.APP_DOMAIN + "</a>";
        console.log("HTML output: \n" + html + "\n");

        var mailOptions = {
            from: mailSender,
            to: email,
            subject: 'Your login instructions for ' + process.env.APP_DOMAIN,
            text: text,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                const response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        error: error.message,
                    }),
                };
                //callback(null, response);
            }
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Email processed succesfully!`
                }),
            };
            console.log(response);
            //callback(null, response);
        });



        return {
            statusCode: 200,

            body: JSON.stringify({ status: 200, data, error: false, message: message }, null, 3)
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }




    } catch (err) {
        console.log(err);
        return { statusCode: 500, body: JSON.stringify({ status: 500, data: null, error: true, message: err.toString() }, null, 3) }
    }
}
