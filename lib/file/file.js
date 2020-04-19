var dotenv = require('dotenv').config();
var dotenvFlow = require('dotenv-flow').config();
var fs = require('fs');
const { Octokit } = require("@octokit/rest");

class File {
    constructor(filename) {
        this.filename = filename;
        this.token = process.env.GITHUB_TOKEN;
        this.owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        this.repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    }

    getContent() {

        var result = null;

        (async () => {
            var Gitorm = new gitorm({
                token: process.env.GITHUB_TOKEN,
                
            });
            await Gitorm.connect();
            console.log(Gitorm.status);         

            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN
            });

            result = null;

            content = octokit.repos.getContents({
                owner: this.owner,
                repo: this.repo,
                path: this.filename
            }).then(result => {
                // content will be base64 encoded
                const content = Buffer.from(result.data.content, 'base64').toString()
                console.log(content)
                result = content;
            });
        })();

        return result;

    }

}

module.exports = File;