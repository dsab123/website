import {inject} from 'aurelia-framework';
import {PostApi} from '../api/postApi';

@inject(PostApi)
export class Home {
    
    constructor(PostApi) { 
        this.postApi = PostApi;

        this.message = "Blogs";
        this.postsList = [];

        this.isLoading = true;
        this.initialLoadingText = "Loading";
        this.loadingText = '';

        this.loadingTextTagline = "(why is this loading taking so long? click \'About\'!)"
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async getBlogPostMetadata() {
        await this.postApi.getBlogPostLookup().then((data) => {
            this.postsList = data;
        });
    }

    activate(urlParams, routeMap, navigationInstruction) {
        this.spinLoadingText();

        this.getBlogPostMetadata().then(() => {
            this.isLoading = false;
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