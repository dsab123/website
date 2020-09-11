import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {PostApi} from '../api/postApi';

@inject(PostApi, EventAggregator)
export class Home {
    
    constructor(PostApi, EventAggregator) { 
        this.postApi = PostApi;
        this.eventAggregator = EventAggregator;

        this.message = "Blogs";
        this.postsList = [];

        this.isLoading = true;
        this.initialLoadingText = "Loading";
        this.loadingText = '';
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