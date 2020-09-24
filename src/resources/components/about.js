import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PostApi} from '../api/postApi';
import {Blog} from './blog';
PLATFORM.moduleName('./blog');

// lolwut why am I extending Blog here? Composition over inheritance, Daniel :facepalm:
@inject(PostApi, EventAggregator, Router)
export class About extends Blog {
    viewModel;

    constructor(PostApi, EventAggregator, Router) {
        super(PostApi, EventAggregator, Router);

        // super hack since compose doesn't work with webpack?
        // https://discourse.aurelia.io/t/dynamically-loading-compose-viewmodels-using-webpack/173
        this.viewModel = './blog';
        this.blogpostId = 4;
        this.slug = 'about-this-site';

        this.alwaysHideRelatedPosts = true;
    }
}