var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

class Product {
    constructor(id) {
        
        if(id.includes('::')) {
            var productId = id.split("::",2)[0];
            var planId = id.split("::",2)[1];
            this.id = productId;
            this.planId = planId;
        }
        else {
            this.id = id;
        }
    }

    getId() {
        return this.id;
    }

    getPlanContent() {
        // Get the relevant static file      
              
        var content = __dirname + '/../data/subscriptionPlans/' + this.planId + '.md';
        content = fs.readFileSync(content, 'utf8');
        // Convert it to JSON
        var fm = require('front-matter');
        var data = fm(content);
        delete data.frontmatter;
        delete data.bodyBegin;

        return data;
    }

    getContent() {
        // Get the relevant static file      
              
        var content = __dirname + '/../data/offerings/' + this.id + '.md';
        content = fs.readFileSync(content, 'utf8');
        // Convert it to JSON
        var fm = require('front-matter');
        var data = fm(content);
        delete data.frontmatter;
        delete data.bodyBegin;

        return data;
    }

}

module.exports = Product;