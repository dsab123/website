import {inject} from 'aurelia-framework';
import {PostApi} from '../api/postApi';
import {Blog} from './blog';

@inject(PostApi)
export class About extends Blog {
    
    constructor(PostApi) {
        super(PostApi);
    }
}