import {noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {SecretsHandler} from '../utility/secretsHandler';

@noView
@inject(SecretsHandler)
export class SummaryApi {
    constructor(SecretsHandler) {
        this.SecretsHandler = SecretsHandler;
        this.httpClient = new HttpClient();
        
        this.baseUrl = 'https://api.github.com/repos/dsab123/book-summaries/contents/summaries/'; 
        this.GITHUB_ACCESS_TOKEN = '';
        this.isConfigured = false;
    }

    configure() {
        this.httpClient.configure(config => {
            config
                .withBaseUrl('api/')
                .withDefaults({
                    headers: {
                        'Authorization': `token ${this.GITHUB_ACCESS_TOKEN}`,
                        'Accept': 'application/vnd.github.v3.raw'
                    }
            })
        });

        this.isConfigured = true;
    }

    async getBookSummaryContents(bookTitle) {
        if (!this.isConfigured) {
            await this.SecretsHandler.getGithubAccessToken().then(accessToken => {  
                this.GITHUB_ACCESS_TOKEN = accessToken;          
                this.configure(); 
            });
        }

        let data = '';
        await this.httpClient.fetch(`${this.baseUrl}${bookTitle}`)
            .then(response => response.text()
            .then(formattedResponse => {
                data = formattedResponse;
        }));

        return data;    
    }
}