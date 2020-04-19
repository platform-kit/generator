var dotenv = require('dotenv');
var dotenvFlow = require('dotenv-flow');
var fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const { Octokit } = require("@octokit/rest");

class Plan {
    constructor(id) {
        this.token = process.env.GITHUB_TOKEN;
        this.owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        this.repo = process.env.GITHUB_REPOSITORY.split('/')[1];
        if (id.includes('.md')) {
            id = id.split(".md", 2)[0];
        }
        this.id = id;
    }

    async generateId (){
        var content = await this.getContent();
        return this.id + '-' + content.attributes.price + '-' + content.attributes.interval;
    }

    async getContent(source) {
        if (process.env.ENVIRONMENT == 'development') {
            var source = 'local'
        }

        if (process.env.ENVIRONMENT == 'production') {
            var source = 'remote';
        }

        if (source == 'local') { return this.getLocalContent(); }

        else { return await this.getRemoteContent(); }

    }

    getLocalContent() {
        // Get the relevant file from local /data dir
        var content = null;
        var content = path.resolve(__dirname + '/../../data/subscriptionPlans/' + this.id + '.md');
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
                path: '/data/subscriptionPlans/' + this.id + '.md'
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
    
    
    async pushToStripe() {

        var plan = null;
        var content = await this.getContent();

        try {
            plan = await stripe.plans.retrieve(this.id + '-' +  content.attributes.price + '-' + content.attributes.interval, object);
        }
        catch (err) {
            console.log('XXX');
            console.log(err);
        }

        if (plan != null) {
            var object = {};
            object.name = content.attributes.title;
            object.description = content.attributes.description;
            object.attributes = ['id', 'name'];
            try {
                plan = await stripe.plans.update(content.attributes.price + '-' + content.attributes.interval, object);
            } catch (err) {

            }
        }

        if (plan == null) {
            //console.log(content);
            var object = {};
            object.id = this.id + '-' + content.attributes.price + '-' + content.attributes.interval;                    
            //console.log('Plan Product:');
            //console.log(content.attributes);
            //object.name = content.attributes.title;
            object.description = content.attributes.description;            
            object.product = content.attributes.product;
            object.interval = content.attributes.interval;
            object.amount = content.attributes.price * 100;
            object.currency = 'usd';
            object.product = this.productId;

            try {
                plan = await stripe.plans.create(object);
            } catch (err) {
                console.log(err);
            }
        }

        return plan;
    }

}

module.exports = Plan;