var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
var productTools = require('./product');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

class Product {
    constructor() {

    }

    getItemsFromCSV(string) {
        return string.split(",");
    }

    getItems(input) {
        if (typeof input == 'string' && input.includes(',')) {
            var items = this.getItemsFromCSV(input);
        }
        else if (typeof input == 'string') {
            items = [input];
        }
        return items;
    }

    getItemsWithData(input) {
        if (typeof input == 'string' && input.includes(',')) {
            var items = this.getItemsFromCSV(input);
        }
        else if (typeof input == 'string') {
            var items = [input];
        }

        var enrichedItems = [];

        items.forEach(function (element) {
            element = new productTools(element).getContent();
            enrichedItems.push(element);
        });

        return enrichedItems;
    }


    async push(items) {

        var product = null;

        
        try {
            product = await stripe.products.retrieve(items[0].product.attributes.id);
        }
        catch (err) {
        }

        if(product == null){
            var object = {};
            object.id = items[0].product.attributes.id;
            object.name = items[0].product.attributes.title;
            object.description = items[0].product.attributes.description;
            if(items[0].product.attributes.type == 'subscription'){
                object.type = 'service';
            }
            else {
                object.type = 'good';
            }
            
            try {
                product =  stripe.products.create(object);
            } catch (err) {

            }
        } 

        var plan = null;

        try {
            plan = await stripe.plans.retrieve(items[0].plan.attributes.id + '-' + items[0].plan.attributes.price + '-' + items[0].plan.attributes.interval);
        }
        catch (err) {
            plan = null;
        }

        if(plan == null){
            var object = {};
            object.id = items[0].plan.attributes.id + '-' + items[0].plan.attributes.price + '-' + items[0].plan.attributes.interval;
            object.nickname = items[0].plan.attributes.title;
            object.amount = items[0].plan.attributes.price * 100;
            object.interval = items[0].plan.attributes.interval;
            object.product = items[0].product.attributes.id;
            object.currency = 'usd';
            try {
                plan =  await stripe.plans.create(object);
            } catch (err) {
                console.log(err);
            }
        }

        var results = {};

        results.product = product;
        results.plan = plan;

        console.log(results);
        return results;
        
    


    }

    getItemsForCheckout(input) {
        if (typeof input == 'string' && input.includes(',')) {
            var items = this.getItemsFromCSV(input);
        }
        else if (typeof input == 'string') {
            var items = [input];
        }

        var enrichedItems = [];

        items.forEach(function (element) {
            var product = new productTools(element);
            // product.findOrPush();                                                  

            element = product.getContent();
            if (element.attributes.cover_image != null && element.attributes.cover_image != '') {
                var image = process.env.APP_URL + element.attributes.cover_image;
                image = image.replace("//", "/");
                image = image.replace("ttp:/", "ttp://");
                image = image.replace("//files", "/files");
                if (image.includes("localhost") || image.includes("8888")) {
                    image = null;
                }
            }
            var images = null;
            if (image != null) {
                images = [image];
            }
            else {
                images = [];
            }
            if (element.attributes.price == null || element.attributes.price == '') {
                element.attributes.price = 99;
            }

            console.log(product);
            console.log('XXX');
            if (product.planId != null) {
                element = { product: product.getContent(), plan: product.getPlanContent() }
            }
            else {
                element = { name: element.attributes.title, description: element.attributes.description, images, amount: element.attributes.price * 100, currency: 'usd', quantity: 1 }
            }

            // element = { name: element.attributes.title, description: element.attributes.description, images, amount: element.attributes.price * 100, currency: 'usd', quantity: 1 }
            enrichedItems.push(element);
        });

        console.log('YYY');
        //console.log(enrichedItems);
        return enrichedItems;
    }

}

module.exports = Product;