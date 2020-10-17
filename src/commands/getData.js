
const Git = require("nodegit")
require('dotenv-flow').config()
const token = process.env.GITHUB_TOKEN;
const fs = require("fs"); // Or `import fs from "fs";` with ESM
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var path = "workspace/repository";

console.log(token)

const {Command, flags} = require('@oclif/command')

class GetDataCommand extends Command {
  async run() {
    const {flags} = this.parse(GetDataCommand)
    var repo = process.env.GITHUB_REPOSITORY;

    if(!repo.includes('://')) {
      repo = 'https://github.com/' + repo;
    }
    console.log(repo)

    if(token != null && typeof token != 'undefined'){
      console.log('get private repo...');
      
      var opts = {
        fetchOpts: {
          callbacks: {
            credentials: function() {
              return Git.Cred.userpassPlaintextNew(token, "x-oauth-basic");
            },
            certificateCheck: function() {
              return 1;
            }
          }
        }
      };
      
      fse.remove(path).then(function() {
        Git.Clone(repo, path, opts).catch()
          .done(function(repo) {
            if (repo instanceof Git.Repository) {
              console.info("We cloned the repo!");
            }
            else {
              console.error("Something borked :(");
            }
          });
      });
    } else {
      Git.Clone(repo, "workspace/" + 'repository').catch().then(function(repository) {
        // Work with the repository object here.
        //console.log(repository)
      })
    }

    
    // Copy files from repo
    var ncp = require('ncp').ncp;
    ncp.limit = 16;

    if (fs.existsSync('./workspace/repository/data')) {
        // Do something
        console.log(123);
        ncp('./workspace/repository/data', './data', function (err) {
          if (err) {
            return console.error(err);
          }
          console.log('done!');
          });
    }    
    
    ncp('./README.md', './static/docs/README.md', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
      });

    if (fs.existsSync('./data/docs')) {
      ncp('./data/docs', './static/docs', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
      });
    }

    ncp('./static/files/icon.png', './static/docs/icon.png', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
      });

  }
}

GetDataCommand.description = `Describe the command here
...
Extra documentation goes here
`

GetDataCommand.flags = {
  // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = GetDataCommand