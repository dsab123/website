import {noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@noView
export class Api {
    constructor() {
        this.httpClient = new HttpClient();
        this.baseUrl = process.env.POSTAPI_BASEURL; 
    }
}