
const fs = require("fs"); // Or `import fs from "fs";` with ESM

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { Command, flags } = require('@oclif/command')

class SyncStripeToDatabaseCommand extends Command {
    async run() {
        const { flags } = this.parse(SyncStripeToDatabaseCommand);

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

        for await (const customer of stripe.customers.list({ limit: 100 })) {


            class StripeCustomer extends Model { };
            StripeCustomer.init({
                // attributes               
                email: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                stripeId: {
                    type: Sequelize.TEXT
                },
                json: {
                    type: Sequelize.JSONB,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'stripe_customer',
                tableName: 'pk_stripe_customers',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            });

            await StripeCustomer.sync({ alter: true });
            StripeCustomer
                .findOrCreate({ where: { stripeId: customer.id }, defaults: { json: customer, email: customer.email } })
                .then(([user, created]) => {
                    user.update({ email: customer.email, json: customer });
                    console.log(user.get({
                        plain: true
                    }))
                    console.log(created)
                });




        }




        for await (const subscription of stripe.subscriptions.list({ limit: 100 })) {


            const Model = Sequelize.Model;

            class StripeSubscription extends Model { };
            StripeSubscription.init({
                // attributes               
                customer: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                stripeId: {
                    type: Sequelize.TEXT
                },
                json: {
                    type: Sequelize.JSONB,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'stripe_subscription',
                tableName: 'pk_stripe_subscriptions',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            });

            await StripeSubscription.sync({ alter: true });
            StripeSubscription
                .findOrCreate({ where: { stripeId: subscription.id }, defaults: { json: subscription, customer: subscription.customer } })
                .then(([result, created]) => {
                    result.update({ customer: subscription.customer, json: subscription });
                    console.log(result.get({
                        plain: true
                    }))
                    console.log(created)
                });




        }


        for await (const product of stripe.products.list({ limit: 100 })) {
            // Do something with customer
            //console.log(customer);


            class StripeProduct extends Model { };
            StripeProduct.init({
                // attributes                           
                stripeId: {
                    type: Sequelize.TEXT
                },
                json: {
                    type: Sequelize.JSONB,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'stripe_product',
                tableName: 'pk_stripe_products',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            });

            await StripeProduct.sync({ alter: true });
            StripeProduct
                .findOrCreate({ where: { stripeId: product.id }, defaults: { json: product } })
                .then(([result, created]) => {
                    result.update({ json: product });
                    console.log(result.get({
                        plain: true
                    }))
                    console.log(created)
                });
        }


        for await (const sku of stripe.skus.list({ limit: 100 })) {
            // Do something with customer
            //console.log(customer);



            class StripeSku extends Model { };
            StripeSku.init({
                // attributes                           
                stripeId: {
                    type: Sequelize.TEXT
                },
                json: {
                    type: Sequelize.JSONB,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'stripe_sku',
                tableName: 'pk_stripe_skus',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            });

            await StripeSku.sync({ alter: true });
            StripeSku
                .findOrCreate({ where: { stripeId: sku.id }, defaults: { json: sku } })
                .then(([result, created]) => {
                    result.update({ json: sku });
                    console.log(result.get({
                        plain: true
                    }))
                    console.log(created)
                });
        }



        for await (const plan of stripe.plans.list({ limit: 100 })) {
            // Do something with customer
            //console.log(customer);



            class StripePlan extends Model { };
            StripePlan.init({
                // attributes                           
                stripeId: {
                    type: Sequelize.TEXT
                },
                json: {
                    type: Sequelize.JSONB,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'stripe_plan',
                tableName: 'pk_stripe_plans',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            });

            await StripePlan.sync({ alter: true });
            StripePlan
                .findOrCreate({ where: { stripeId: plan.id }, defaults: { json: plan } })
                .then(([result, created]) => {
                    result.update({ json: plan });
                    console.log(result.get({
                        plain: true
                    }))
                    console.log(created)
                });
        }


        for await (const transaction of stripe.balanceTransactions.list({ limit: 100 })) {
            // Do something with customer
            console.log(transaction);



            class StripeTransaction extends Model { };
            StripeTransaction.init({
                // attributes                           
                stripeId: {
                    type: Sequelize.TEXT
                },
                json: {
                    type: Sequelize.JSONB,
                    allowNull: true
                },
            }, {
                sequelize,
                modelName: 'stripe_transaction',
                tableName: 'pk_stripe_transactions',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            });

            await StripeTransaction.sync({ alter: true });
            StripeTransaction
                .findOrCreate({ where: { stripeId: transaction.id }, defaults: { json: transaction } })
                .then(([result, created]) => {
                    result.update({ json: transaction });
                    console.log(result.get({
                        plain: true
                    }))
                    console.log(created)
                });
        }

    }
}

SyncStripeToDatabaseCommand.description = `Describe the command here
...
Extra documentation goes here
`

SyncStripeToDatabaseCommand.flags = {
    // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SyncStripeToDatabaseCommand