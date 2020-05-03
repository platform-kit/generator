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

        var headers = event.headers;
        console.log('Authorization: \n\n\n\n');
        console.log(headers.authorization);
        var token = headers.authorization || event.queryStringParameters.token || null;
        console.log(token);

        if (token.includes('Bearer ')) {
            token = token.split('Bearer ')[1];
            console.log('\n\n\n Bearer: \n\n\n' + token);
        }


        const jwt = require('jsonwebtoken');
        const loginSecretKey = process.env.JWT_SECRET;
        var data = jwt.verify(token, loginSecretKey);
        token = token = jwt.sign({ sub: data.sub }, loginSecretKey, { expiresIn: '365 days' });
        data = jwt.verify(token, loginSecretKey);
        var message = 'Token validated.';

        if (process.env.DATABASE_URL != null) {
            const Sequelize = require('sequelize');
            const sequelize = new Sequelize(process.env.DATABASE_URL);
            sequelize
                .authenticate()
                .then(() => {
                    console.log('Connection has been established successfully.');
                })
                .catch(err => {
                    console.error('Unable to connect to the database:', err);
                });

            const Model = Sequelize.Model;
            class User extends Model { };
            User.init({
                // attributes               
                email: {
                    type: Sequelize.TEXT
                    // allowNull defaults to true
                },
                verified: {
                    type: Sequelize.BOOLEAN
                    // allowNull defaults to true
                },
                verified_at: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                permissions: {
                    type: Sequelize.JSONB,
                    allowNull: true
                }
            }, {
                sequelize,
                modelName: 'user',
                tableName: 'pk_users',
                updatedAt: 'updated_at',
                createdAt: 'created_at',
                verifiedAt: 'verified_at',

                // options
            });

            await User.sync({ alter: true });

            var currentUser = await User.findOrCreate({
                where: { email: data.sub }
            }).then(([user, created]) => {
                console.log(user.get({
                    plain: true
                }))
                console.log(created)
                user.verified = true;
                var date = new Date();
                user.verified_at = date.toDateString();
                user.save();
                return user;
            });

            var user = {}
            user.verified = (currentUser.verified ==true);
            user.createdAt = currentUser.created_at;
            user.permissions = currentUser.permissions;

            if(currentUser.permissions != null && currentUser.permissions.dashboard == 'all' && process.env.CUBE_ANALYTICS_SECRET != null) {                
                user.tokens = {};
                var analyticstToken = jwt.sign({ sub: data.sub }, process.env.CUBE_ANALYTICS_SECRET , { expiresIn: '1 day' });            
                var analyticstTokenData = jwt.verify(analyticstToken, process.env.CUBE_ANALYTICS_SECRET );
                user.tokens.analytics = {token: analyticstToken, expires: analyticstTokenData.exp};
            }
            //user = currentUser;

        }

        return {
            statusCode: 200,

            body: JSON.stringify({ status: 200, data, error: false, message: message, token: token, user: user }, null, 3)
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ status: 500, data: data, error: true, message: err.toString() }, null, 3) }
    }
}