import {noView} from 'aurelia-framework';
import * as environment from '../../../config/environment.json';
var SecretsManager = require('aws-sdk/clients/SecretsManager');

@noView
export class SecretsHandler {
    async getGithubAccessToken() {
        return new Promise((resolve, reject) => {
            if (environment.debug) {
                resolve(process.env.GITHUB_ACCESS_TOKEN);
            } else {            
                let client = new SecretsManager({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION
                });

                client.getSecretValue({SecretId: 'GITHUB_ACCESS_TOKEN'}, function(err, data) {
                    if (err) {
                        console.log(err.code);
                        throw err;
                    } 
                    
                    if ('SecretString' in data) {
                        resolve(JSON.parse(data.SecretString).GITHUB_ACCESS_TOKEN);
                    }
                });
            };
        });
    }
}