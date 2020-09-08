import {inject} from 'aurelia-framework';
import {PostApi} from '../api/postApi';
import {Blog} from './blog';

@inject(PostApi)
export class About extends Blog {
    viewModel;

    constructor(PostApi) {
        super(PostApi);

        // super hack since compose doesn't work with webpack?
        // https://discourse.aurelia.io/t/dynamically-loading-compose-viewmodels-using-webpack/173
        this.viewModel = './blog';
    }
}