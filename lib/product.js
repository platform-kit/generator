var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

class Product {
    constructor(id) {
        this.id = id;
    }

    getId() {
        return this.id;
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