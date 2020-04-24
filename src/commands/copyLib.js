
const Git = require("nodegit")
require('dotenv-flow').config()
const repo = process.env.REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const fs = require("fs"); // Or `import fs from "fs";` with ESM
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var path = "workspace/repository";

console.log(token)

const { Command, flags } = require('@oclif/command')

class CopyLibCommand extends Command {
  async run() {
    const { flags } = this.parse(CopyLibCommand)

    // Copy files from repo
    var ncp = require('ncp').ncp;
    ncp.limit = 16;    

    if (fs.existsSync('./lib')) {
      // Do something
      console.log(123);
      ncp('./lib', './functions/platformkit-content-read-v1/lib', function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
      });
    }

    if (fs.existsSync('./lib')) {
      // Do something
      console.log(123);
      ncp('./lib', './functions/platformkit-payments-checkout-v1/lib', function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
      });
    }    

  }
}

CopyLibCommand.description = `Describe the command here
...
Extra documentation goes here
`

CopyLibCommand.flags = {
  // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CopyLibCommand