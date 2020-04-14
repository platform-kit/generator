
const fs = require("fs"); // Or `import fs from "fs";` with ESM

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { Command, flags } = require('@oclif/command')

class SyncStripeCommand extends Command {
    async run() {
        const { flags } = this.parse(SyncStripeCommand)

        const testFolder = './data/offerings';
        var productTools = require('../../lib/product');

        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                //console.log(file);
                void async function() {
                    var productFile = new productTools(file);                
                    var product = await(productFile.pushToStripe());
                    var variants = await(productFile.pushVariantsToStripe());
                    console.log(product);
                  }();
                
                //console.log(product);
                //var product = await productFile.pushToStripe();
                //console.log(product);
            });
        });
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