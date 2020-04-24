
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

class StartCmsCommand extends Command {
  async run() {
    
    const { exec } = require("child_process");

    exec('cd workspace/repository; npx netlify-cms-proxy-server', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }      
    
      console.log(`stdout: ${stdout}`);
    });

    //await HerokuConfig.run(['--app', flags.app]);
     
  }
  
}

StartCmsCommand.description = `Describe the command here
...
Extra documentation goes here
`

StartCmsCommand.flags = {
  // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = StartCmsCommand