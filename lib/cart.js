var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
var productTools = require('./product');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

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

    getItemsForCheckout(input) {
        if (typeof input == 'string' && input.includes(',')) {
            var items = this.getItemsFromCSV(input);
        }
        else if (typeof input == 'string') {
            var items = [input];
        }

        var enrichedItems = [];

        items.forEach(function (element) {
            element = new productTools(element).getContent();
            if( element.attributes.cover_image != null &&  element.attributes.cover_image != '') {
                var image = process.env.APP_URL + element.attributes.cover_image;                
                image = image.replace("//", "/");
                image = image.replace("ttp:/", "ttp://");
                image = image.replace("//files", "/files");
                if(image.includes("localhost") || image.includes("8888")) {
                    image = null;
                }
            }
            var images = null;
            if(image != null){
                images = [image];
            }
            else {
                images = [];
            }
            element = { name: element.attributes.title, description: element.attributes.description, images, amount: element.attributes.price * 100, currency: 'usd', quantity: 1 }
            enrichedItems.push(element);
        });

        return enrichedItems;
    }

}

module.exports = Product;