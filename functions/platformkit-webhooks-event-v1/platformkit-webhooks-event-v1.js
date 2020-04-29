// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {



    try {
        // Get webhook data
        // console.log(event.headers.authorization);        
        var body = event.body; 
        var headers = JSON.stringify(event.headers); 
            
        var message = null;
        var meta = null;

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
            class Webhook extends Model { };            
            Webhook.init({
                // attributes               
                headers: {
                    type: Sequelize.TEXT
                    // allowNull defaults to true
                },
                body: {
                    type: Sequelize.TEXT
                    // allowNull defaults to true
                },
                processed_at: {
                    type: Sequelize.TIME,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'webhook',
                tableName: 'pk_webhooks',
                updatedAt: 'updated_at',
                createdAt: 'created_at'

                // options
            });

            await Webhook.sync({ alter: true });

            await Webhook.create({                
                headers: headers,
                body: body,
                processed_at: null
            });

        }

        return {
            statusCode: 200,
            body: JSON.stringify({ status: 200, body, error: false, message: message }, meta, 3)
        };
    }



    catch (err) {
        console.log(err);
        return { statusCode: 500, body: JSON.stringify({ status: 500, data: null, error: true, message: err.toString() }, null, 3) }
    }
}