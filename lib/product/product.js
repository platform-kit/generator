var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

class Product {
    constructor(id) {
        if (id.includes('.md')) {
            id = id.split(".md", 2)[0];
        }
        if (id.includes('::')) {
            var productId = id.split("::", 2)[0];
            var planId = id.split("::", 2)[1];
            if(id.split("~", 2).length > 1) {
            var skuId = id.split("~", 2)[1].str.substring(1, 255);;
            }
            this.id = productId;
            this.planId = planId;
            this.skuId = skuId;
        }
        else {
            this.id = id;
        }
    }

    getId() {
        return this.id;
    }

    async pushVariantsToStripe(){
         
        if (this.getContent().attributes.variants != null) {
            //console.log(this.getContent().attributes.variants);
            this.getContent().attributes.variants.forEach(variant => {
                //console.log(variant);
                var variantRecord = null;
                var productId = this.productId;
                
                try {
                    variantRecord = stripe.skus.retrieve(variant.id,  function(err, sku, productId) {
                        // asynchronously called
                        if(err) {
                            //console.log(err);
                            //console.log(123);
                            
                            //console.log('SKU ' + variant.id + ' doesn\'t exist.');
                            var object = {};
                            object.id = variant.id;                           
                            object.currency = 'usd';
                            object.price = variant.price * 100;
                            console.log('-----');
                            console.log(variant.attributes);
                            console.log('-----');
                            var pairs = {};
                            var returnPair = function(pair){
                                var key = pair.key;
                                var value = pair.value;                                
                                pairs[key] = value;
                                // console.log ('obj: ');
                                // console.log (obj);
                                
                            }
                            variant.attributes.forEach(pair => returnPair(pair));
                            object.metadata = pairs;
                            object.attributes = {'id': variant.id, 'name': variant.name};
                            object.inventory = {type: 'infinite'};
                            object.product = 'offering-Kg8tzWA9Y';
                            object.image = (process.env.APP_URL + variant.image).replace("//files", '/files');
                            try {
                                //console.log(productId);
                                var createVariant = async function (){ variantRecord = await stripe.skus.create(object);}();
                            } catch (err) {
                                console.log(err);
                            }
                        }
                        else {
                            console.log('SKU ' + variant.id + ' exists.');
                            var object = {};                            
                            //object.name = variant.name;
                            var pairs = {};
                            var returnPair = function(pair){
                                var key = pair.key;
                                var value = pair.value;                                
                                pairs[key] = value;
                                // console.log ('obj: ');
                                // console.log (obj);
                                
                            }
                            variant.attributes.forEach(pair => returnPair(pair));
                            object.metadata = pairs;
                            object.image = (process.env.APP_URL + variant.image).replace("//files", '/files');
                            object.attributes = {'id': variant.id, 'name': variant.name};
                            //object.name = variant.name;                            
                            try {
                                variantRecord = stripe.skus.update(variant.id, object);
                            } catch (err) {
        
                            }
                        }
                    });
                    
                }
                catch (err) {
                    variantRecord = null;                                        
                }                           

            })
        }
    }

    async pushToStripe() {


        var product = null;
        

        try {
            product = await stripe.products.retrieve(this.getContent().attributes.id);
        }
        catch (err) {
        }

        if (product != null) {
            var object = {};
            //object.id = this.getContent().attributes.id;
            object.name = this.getContent().attributes.title;
            object.description = this.getContent().attributes.description;
            object.attributes = ['id', 'name'];
            try {
                product = stripe.products.update(this.getContent().attributes.id, object);
            } catch (err) {

            }
        }

        if (product == null) {
            var object = {};
            object.id = this.getContent().attributes.id;
            object.name = this.getContent().attributes.title;
            object.description = this.getContent().attributes.description;
            object.attributes = ['id', 'name'];
            if (this.getContent().attributes.type == 'subscription') {
                object.type = 'service';
            }
            else {
                object.type = 'good';
            }

            try {
                product = stripe.products.create(object);
            } catch (err) {

            }
        }

       

        
        return product;
    }

    getPlanContent() {
        // Get the relevant static file      

        var content = null;
        var content = __dirname + '/../../data/subscriptionPlans/' + this.planId + '.md';
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

        var content = __dirname + '/../../data/offerings/' + this.id + '.md';
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