var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const { Octokit } = require("@octokit/rest");

class Product {
    constructor(id) {
        this.token = process.env.GITHUB_TOKEN;
        this.owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        this.repo = process.env.GITHUB_REPOSITORY.split('/')[1];
        if (id.includes('.md')) {
            id = id.split(".md", 2)[0];
        }
        if (id.includes('::')) {
            var productId = id.split("::", 2)[0];
            var planId = id.split("::", 2)[1];
            if (id.split("~", 2).length > 1) {
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

    async getContent(source) {
        if (typeof source == 'undefined') {
            var source = 'local'
        }

        if (source == 'local') { return this.getLocalContent(); }

        else { return await this.getRemoteContent(); }

    }

    getLocalContent() {
        // Get the relevant file from local /data dir
        var content = null;
        var content = path.resolve(__dirname + '/../../data/offerings/' + this.id + '.md');
        content = fs.readFileSync(content, 'utf8');
        // Convert it to JSON
        var fm = require('front-matter');
        var data = fm(content);
        //console.log(data);
        delete data.frontmatter;
        delete data.bodyBegin;
        return data;
    }


    async getRemoteContent() {

        var result = null;

        var content = (async () => {
            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN
            });
            var content = octokit.repos.getContents({
                owner: this.owner,
                repo: this.repo,
                path: '/data/offerings/' + this.id + '.md'
            }).then(result => {
                // content will be base64 encoded
                const content = Buffer.from(result.data.content, 'base64').toString()
                result = content;
                var fm = require('front-matter');
                var data = fm(content);
                delete data.frontmatter;
                delete data.bodyBegin;
                return data;
            });
        });

        return await content();

    }

    getPlanContent(source) {
        if (typeof source == 'undefined') {
            var source = 'local'
        }

        if (source == 'local') { return this.getLocalPlanContent(); }

        else { return this.getRemotePlanContent(); }

    }

    getLocalPlanContent() {
        // Get the relevant file from Github
        var content = null;
        var content = path.resolve(__dirname + '/../../data/subscriptionPlans/' + this.planId + '.md');
        content = fs.readFileSync(content, 'utf8');
        // Convert it to JSON
        var fm = require('front-matter');
        var data = fm(content);
        delete data.frontmatter;
        delete data.bodyBegin;

        return data;
    }

    async getRemotePlanContent() {

        var result = null;

        var content = (async () => {
            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN
            });
            var content = octokit.repos.getContents({
                owner: this.owner,
                repo: this.repo,
                path: '/data/subscriptionPlans/' + this.planId + '.md'
            }).then(result => {
                // content will be base64 encoded
                const content = Buffer.from(result.data.content, 'base64').toString()
                result = content;
                var fm = require('front-matter');
                var data = fm(content);
                delete data.frontmatter;
                delete data.bodyBegin;
                return data;
            });
        });

        return await content();

    }

    async pushVariantsToStripe() {

        var content = await this.getContent();

        if (content.attributes.variants != null) {
            //console.log(this.getContent().attributes.variants);
            content.attributes.variants.forEach(variant => {
                //console.log(variant);
                var variantRecord = null;
                var productId = this.productId;

                try {
                    variantRecord = stripe.skus.retrieve(variant.id, function (err, sku, productId) {
                        // asynchronously called
                        if (err) {
                            //console.log(err);
                            //console.log(123);

                            //console.log('SKU ' + variant.id + ' doesn\'t exist.');
                            var object = {};
                            object.id = variant.id;
                            object.currency = 'usd';
                            object.price = variant.price * 100;
                            //console.log('-----');
                            //console.log(variant.attributes);
                            //console.log('-----');
                            var pairs = {};
                            var returnPair = function (pair) {
                                var key = pair.key;
                                var value = pair.value;
                                pairs[key] = value;
                                // console.log ('obj: ');
                                // console.log (obj);

                            }
                            variant.attributes.forEach(pair => returnPair(pair));
                            object.metadata = pairs;
                            object.attributes = { 'id': variant.id, 'name': variant.name };
                            object.inventory = { type: 'infinite' };
                            object.product = 'offering-Kg8tzWA9Y';
                            object.image = (process.env.APP_URL + variant.image).replace("//files", '/files');
                            try {
                                //console.log(productId);
                                var createVariant = async function () { variantRecord = await stripe.skus.create(object); }();
                            } catch (err) {
                                console.log(err);
                            }
                        }
                        else {
                            //console.log('SKU ' + variant.id + ' exists.');
                            var object = {};
                            //object.name = variant.name;
                            var pairs = {};
                            var returnPair = function (pair) {
                                var key = pair.key;
                                var value = pair.value;
                                pairs[key] = value;
                                // console.log ('obj: ');
                                // console.log (obj);

                            }
                            variant.attributes.forEach(pair => returnPair(pair));
                            object.metadata = pairs;
                            object.image = (process.env.APP_URL + variant.image).replace("//files", '/files');
                            object.attributes = { 'id': variant.id, 'name': variant.name };
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

    async pushPlansToStripe() {

        var content = await this.getContent();

        if (content.attributes.plans != null) {
            //console.log(this.getContent().attributes.variants);
            content.attributes.plans.forEach(plan => {
                //console.log('PLAN: ----- ' + plan);                
                //console.log('PRODUCT: ----- ' + this.id);        
                var planTools = require('../plan/plan');
                var plan = new planTools(plan);
                plan.productId = this.id;
                var result = plan.pushToStripe();
                //console.log(result);                                            
            })
        }
    }

    async pushToStripe() {

        var product = null;
        var content = await this.getContent();

        try {
            product = await stripe.products.retrieve(content.attributes.id);
        }
        catch (err) {
        }

        if (product != null) {
            var object = {};
            object.name = content.attributes.title;
            object.description = content.attributes.description;
            object.attributes = ['id', 'name'];
            try {
                product = stripe.products.update(content.attributes.id, object);
            } catch (err) {

            }
        }

        if (product == null) {
            var object = {};
            object.id = this.id;
            //console.log('---------- ---------- ---------- ---------- CONTENT TITLE: ');
            
            
            object.name = content.attributes.title;
            object.description = content.attributes.description;
            object.attributes = ['id', 'name'];
            if (content.attributes.type == 'subscription') {
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

}

module.exports = Product;