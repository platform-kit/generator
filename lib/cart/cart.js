var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
var productTools = require('../product/product');
var planTools = require('../plan/plan');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

class Cart {
    constructor() {

    }

    async decode(input){
        var array = input.split("::");
        var product = array[0];      
        var plan = array[1];
        product = new productTools(product);
        plan = new planTools(plan);
        return [product, plan];
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

        items.forEach(async function (element) {
            element = new productTools(element);
            element = await element.getContent();
            enrichedItems.push(element);
        });

        return enrichedItems;
    }

    getItemsForCheckout(items) {
        return this.getItemsWithData(items);
    }

}

module.exports = Cart;