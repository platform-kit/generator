
const Git = require("nodegit")
require('dotenv-flow').config()
const repo = process.env.REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const fs = require("fs"); // Or `import fs from "fs";` with ESM
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var path = "workspace/repository";

var StartCmsCommand = require('./StartCms');

console.log(token)

const { Command, flags } = require('@oclif/command')

class OpenAdminCommand extends Command {
  async run() {
    
    const { exec } = require("child_process");

    function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }

    try {
    
      (async () => {
        await StartCmsCommand.run();
        console.log("Hello!");
      })();                                
    }
    catch (err){
      console.log(err);
    }

    exec('open http://localhost:8888/admin-local/', (error, stdout, stderr) => {
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

    
     
  }
  
}

OpenAdminCommand.description = `Describe the command here
...
Extra documentation goes here
`

OpenAdminCommand.flags = {
  // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = OpenAdminCommand