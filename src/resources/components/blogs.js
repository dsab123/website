import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PostApi} from '../api/postApi';

@inject(PostApi, EventAggregator, Router)
export class Home {
    
    constructor(PostApi, EventAggregator, Router) { 
        this.postApi = PostApi;
        this.eventAggregator = EventAggregator;
        this.router = Router;

        this.message = "Blogs";
        this.postsList = [];

        this.isLoading = true;
        this.initialLoadingText = "Loading";
        this.loadingText = '';

        // have to do this because aurelia automatically prepends the title from app.js to the residual
        // title from the last page :facepalm:
        this.router.title = '';
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async getBlogPostMetadata() {
        await this.postApi.getBlogPostLookup().then((data) => {
            this.postsList = data;
        });
    }

    async activate(urlParams, routeMap, navigationInstruction) {
        this.spinLoadingText();

        this.getBlogPostMetadata().then(() => {
            this.isLoading = false;
            this.eventAggregator.publish('contentLoaded');
        });
    }

    async spinLoadingText() {
        let dots = ['.', '..', '...', '..'];
        let count = 0;

        while (this.isLoading) {
            this.loadingText = this.initialLoadingText + dots[count++ % dots.length];            
            await this.sleep(400);
        }
    }
}