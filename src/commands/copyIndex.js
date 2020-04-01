
const Git = require("nodegit")
require('dotenv-flow').config()
const repo = process.env.REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const fs = require("fs"); // Or `import fs from "fs";` with ESM
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var path = "workspace/repository";

console.log(token)

const {Command, flags} = require('@oclif/command')

class CopyIndexCommand extends Command {
  async run() {
    const {flags} = this.parse(CopyIndexCommand)
  
    // Copy files from repo
    var ncp = require('ncp').ncp;
    ncp.limit = 16;

    if (fs.existsSync('./workspace/repository/src/index.html')) {
        // Do something
        console.log(123);
        ncp('./workspace/repository/src/index.html', './src/index.html', function (err) {
          if (err) {
            return console.error(err);
          }
          console.log('done!');
          });
    }        
  }
}

CopyIndexCommand.description = `Describe the command here
...
Extra documentation goes here
`

CopyIndexCommand.flags = {
  // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CopyIndexCommand