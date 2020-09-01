import {noView} from 'aurelia-framework';
import * as environment from '../../../config/environment.json';
import AWS from 'aws-sdk';

@noView
export class SecretsManager {
    async getGithubAccessToken() {
        return new Promise((resolve, reject) => {
            // TODO CHANGE THIS EXCLAMATION POINT
            if (!environment.debug) {
                resolve(process.env.GITHUB_ACCESS_TOKEN);
            } else {            
                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION
                });

                let client = new AWS.SecretsManager({
                    region: 'us-east-1'
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