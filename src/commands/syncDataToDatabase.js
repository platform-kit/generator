
const fs = require("fs");

const { Command, flags } = require('@oclif/command')

class SyncDataToDatabaseCommand extends Command {
    async run() {
        const { flags } = this.parse(SyncDataToDatabaseCommand)

        const dataFolder = './data';

        const Sequelize = require('sequelize');
        const sequelize = new Sequelize(process.env.DATABASE_URL);
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        const Model = Sequelize.Model;
        class File extends Model { };
        File.init({
            // attributes
            filename: {
                type: Sequelize.STRING,
                allowNull: true
            },
            path: {
                type: Sequelize.STRING,
                allowNull: true
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true

            },
            json: {
                type: Sequelize.JSONB,
                allowNull: true
                // allowNull defaults to true
            }
        }, {
            sequelize,
            modelName: 'file',
            tableName: 'pk_files',
            updatedAt: 'updated_at',
            createdAt: 'created_at'

            // options
        });

        await File.sync({ alter: true });

        var fm = require('front-matter');
        var fs = require('fs');

        fs.readdir(dataFolder, (err, files) => {
            files.forEach(file => {        

                if (file.includes('.json')) {
                    console.log(file);
                    var content = fs.readFileSync('./data/' + file, 'utf8');
                    //var data = fm(content);
                    File.create({
                        filename: file,
                        path: 'data/' + file,
                        content: JSON.stringify(content),
                        json: JSON.parse(content)
                    });
                }
                if (!file.includes('.')) {
                    var folder = file;
                    fs.readdir(dataFolder + '/' + file, (err, files) => {
                        files.forEach(file => {
                            console.log(file);
                            var content = fs.readFileSync('./data/' + folder + '/' + file, 'utf8');
                            var data = fm(content);
                            File.create({
                                filename: file,
                                path: 'data/' + folder + '/' + file,
                                content: JSON.stringify(content),
                                json: data
                            });
                        }
                        )
                    });

                }

            });
        });

    }
}

SyncDataToDatabaseCommand.description = `Describe the command here
...
Extra documentation goes here
`

SyncDataToDatabaseCommand.flags = {
    // name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SyncDataToDatabaseCommand