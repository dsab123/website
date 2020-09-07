import {noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@noView
export class Api {
    constructor() {
        this.httpClient = new HttpClient();
        this.baseUrl = 'https://7dfaiqkhk5.execute-api.us-east-1.amazonaws.com/stage/'; 
    }
}