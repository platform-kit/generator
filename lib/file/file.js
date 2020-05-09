var dotenv = require('dotenv').config();
var dotenvFlow = require('dotenv-flow').config();
var fs = require('fs');
const path = require('path');
const { Octokit } = require("@octokit/rest");

class File {
    constructor(id) {
        this.token = process.env.GITHUB_TOKEN;
        this.owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        this.repo = process.env.GITHUB_REPOSITORY.split('/')[1];
        this.id = id;
    }

    async getContent(source) {
        if (process.env.ENVIRONMENT == 'development') {
            var source = 'local'
        }

        if (process.env.ENVIRONMENT == 'production') {
            var source = 'remote';
        }

        if (source == 'local') { return this.getLocalContent(); }

        else { return await this.getRemoteContent(); }

    }

    getLocalContent() {
        // Get the relevant file from local /data dir
        var content = null;
        var content = path.resolve(__dirname + '/../../' + this.id);
        content = fs.readFileSync(content, 'utf8');
        // Convert it to JSON
        var fm = require('front-matter');
        var data = fm(content);
        //console.log(data);
        delete data.frontmatter;
        delete data.bodyBegin;
        return data;
    }


    async getRemoteContent() {

        var result = null;

        var content = (async () => {
            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN
            });
            var content = octokit.repos.getContents({
                owner: this.owner,
                repo: this.repo,
                path: this.id 
            }).then(result => {
                // content will be base64 encoded
                const content = Buffer.from(result.data.content, 'base64').toString()
                result = content;
                var fm = require('front-matter');
                var data = fm(content);
                delete data.frontmatter;
                delete data.bodyBegin;
                return data;
            });
        });

        return await content();

    }

}

module.exports = File;