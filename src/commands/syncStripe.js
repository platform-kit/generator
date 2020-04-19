
const fs = require("fs"); // Or `import fs from "fs";` with ESM

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { Command, flags } = require('@oclif/command')

class SyncStripeCommand extends Command {
    async run() {
        const { flags } = this.parse(SyncStripeCommand)

        const productsFolder = './data/offerings';
        var productTools = require('../../lib/product/product');

        fs.readdir(productsFolder, (err, files) => {
            files.forEach(file => {                
                void async function() {
                    console.log("File: ");
                    console.log(file);
                    var productFile = new productTools(file);                
                    var product = await(productFile.pushToStripe());
                    var variants = await(productFile.pushVariantsToStripe());
                    var plans = await(productFile.pushPlansToStripe());
                    //console.log(product);
                  }();
                                
            });
        });

        /*
        const plansFolder = './data/subscriptionPlans';
        var planTools = require('../../lib/plan/plan');
        fs.readdir(plansFolder, (err, files) => {
            files.forEach(file => {                
                void async function() {
                    console.log("File: ");
                    console.log(file);
                    var planFile = new planTools(file);                
                    var plan = await(planFile.pushToStripe());                    
                    console.log(plan);
                  }();
                                
            });
        });
        */
    }
}

SyncStripeCommand.description = `Describe the command here
...
Extra documentation goes here
`

SyncStripeCommand.flags = {
    // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SyncStripeCommand