var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

class User {
    constructor(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

 
    async getDetails() {

        var customers = [];
        var subscriptions = [];

        // In Node 10:
        for await (const customer of stripe.customers.list({ limit: 20 })) {
            // Do something with customer
            if (customer.email == this.email && customer.subscriptions.total_count > 0) {
                customers.push(customer.id);
            }
        }

        for await (const subscription of stripe.subscriptions.list({ limit: 20 })) {
            // Do something with customer
            if (customers.includes(subscription.customer)) {
                subscriptions.push(subscription);
            }
        }

        var user = { email: this.email, customer_identities: { stripe: customers }, subscriptions: subscriptions };
        console.log(user);

        return user;

    }

    findOrCreateProduct(id) {

        /*
        var exists = true;
        var product = await stripe.products.retrieve(
            id,
            function (err, product) {
                // asynchronously called
                exists = false;
            }
        );
        if (exists == false) {
            /*
            stripe.products.create(
                {
                  id: id,
                  name: 'T-shirt',
                  type: 'good',
                  description: 'Comfortable cotton t-shirt',
                  attributes: ['size', 'gender'],
                },
                function(err, product) {
                  // asynchronously called
                }
              );
            }
            */

    }

}

module.exports = User;