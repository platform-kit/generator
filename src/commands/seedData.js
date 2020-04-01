
const fs = require("fs"); // Or `import fs from "fs";` with ESM



const { Command, flags } = require('@oclif/command')

class SeedDataCommand extends Command {
  async run() {
    const { flags } = this.parse(SeedDataCommand)

    // Copy files from repo
    var ncp = require('ncp').ncp;
    ncp.limit = 16;
    ncp('./prototypes', './data', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
    });

    ncp('./README.md', './static/docs/README.md', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
    });

    ncp('./static/logos', './static/docs', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
    });

  }
}

SeedDataCommand.description = `Describe the command here
...
Extra documentation goes here
`

SeedDataCommand.flags = {
  // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SeedDataCommand