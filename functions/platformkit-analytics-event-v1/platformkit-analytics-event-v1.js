// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

    const ANALYTICS_ENDPOINT = process.env.ANALYTICS_ENDPOINT;

    try {
        // Get event data from url parameters

        var params = event.queryStringParameters || null;

        if (typeof params.data == 'string') {
            params.data = JSON.parse(params.data);
        }

        var data = params;
        console.log(params);
        var message = null;

        if (ANALYTICS_ENDPOINT != null) {

            const webhook = require('send-webhook');

            const URLS = [
                ANALYTICS_ENDPOINT
            ];

            message = "Event received.";
            var meta = {
                "urls": URLS
            }

            webhook(URLS, data, (error, status) => {
                if (error) {
                    console.error(error);
                }
                else {
                    console.log('Event sent to:');
                    console.log(URLS);
                    console.log(message);
                }
            });
        }

        if (process.env.DATABASE_URL != null) {

            try {
                
                
                var headers = event.headers; 
                console.log('Authorization: \n\n\n\n');
                console.log(headers.authorization);
                var token =  headers.authorization || event.queryStringParameters.token ||  null;
                console.log(token);

                if(token.includes('Bearer ')) {
                    token = token.split('Bearer ')[1];
                    console.log('\n\n\n Bearer: \n\n\n' + token);
                }
                                
                if(token != null && token != '') {
                    const jwt = require('jsonwebtoken');
                    const loginSecretKey = process.env.JWT_SECRET;
                    try {
                    token = jwt.verify(token, loginSecretKey);
                    } catch (err){
                        console.log(err);
                        token = null;
                    }
                }
                else {
                    token = null;
                }
                

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
                class Event extends Model { };
                Event.init({
                    // attributes
                    event: {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    data: {
                        type: Sequelize.JSONB
                        // allowNull defaults to true
                    },
                    token: {
                        type: Sequelize.JSONB,
                        allowNull: true
                        // allowNull defaults to true
                    }
                }, {
                    sequelize,
                    modelName: 'event',
                    tableName: 'pk_events',
                    updatedAt: 'updated_at',
                    createdAt: 'created_at'

                    // options
                });

                await Event.sync({ alter: true });

                await Event.create({
                    event: params.event,
                    data: params.data,
                    token: token
                });
            }
            catch (err) {
                console.log(err);
            }

        }
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 200, data, error: false, message: message }, meta, 3)
        };
    }



    catch (err) {
        console.log(err);
        return { statusCode: 500, body: JSON.stringify({ status: 500, data: null, error: true, message: err.toString() }, null, 3) }
    }
}