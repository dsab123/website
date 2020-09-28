import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PostApi} from '../api/postApi';

const showdown = require('showdown');

@inject(PostApi, EventAggregator, Router)
export class Blog {
    constructor(PostApi, EventAggregator, Router) {
        this.postApi = PostApi;
        this.eventAggregator = EventAggregator;
        this.router = Router;

        // properties for main post
        this.postTitle = null;
        this.postContents = null;
        this.postTags = null;
        this.hasFirstPostBeenLoadedd = false;
        this.blogpostId = 1;
        this.slug = '';

        // properties for related posts by tag
        this.relatedPosts = [];
        this.filteredRelatedPosts = [];
        this.showRelatedPosts = false;
        this.noRelatedPosts = false;
        this.selectedRelatedPostTag = null;
    }

    async activate(urlParams, routeMap, navigationInstruction) {
        this.blogpostId = urlParams.blogpostId ?? this.blogpostId ?? 1;
        let data = '';

        this.eventAggregator.publish('dim-content');

        this.scrollToTopBeforeNewPostIsLoaded();
        await this.sleep(800);

        await this.getBlogPostInfo(this.blogpostId);

        this.router.title = `${this.postTitle} - Daniel Sabbagh`;

        // if we have slug we don't need to wait for postContents to give us slug from api
        data = await this.postApi.getBlogPostContents(this.slug || urlParams?.slug);
        
        let converter = new showdown.Converter({
            simpleLineBreaks: 'true'
        });

        this.postContents = converter.makeHtml(data);
        this.setPostContentsContainer();
        
        this.eventAggregator.publish('undim-content');
    }

    async attached() {
        this.eventAggregator.publish('dim-content');

        this.setPostContentsContainer();
        
        // poor man's awaitable scroll
        this.scrollToTopBeforeNewPostIsLoaded();
        await this.sleep(800);

        this.eventAggregator.publish('undim-content');
    }

    async getBlogPostInfo(postId) {
        if (!postId) {
            postId = this.getDefaultPostId();
        }
        
        const data = await this.postApi.getBlogPostInfo(postId);

        this.postTitle = data.title;
        this.postTags = data.tags;
        this.slug = data.slug;

        this.hasFirstPostBeenLoadedd = true;
    }

    async setPostContentsContainer() {
        if (this.postContentsContainer) {
            this.postContentsContainer.innerHTML = this.postContents;
        }

        // can't figure out why the eventAggregator is in a weird state when
        // called from about with <compose> ... just going to hide the 
        // error like a n00b and forget about it
        if (!this.alwaysHideRelatedPosts) {
            this.eventAggregator.publish('content-loaded');
        }
    }

    getDefaultPostId() {
        return 1;
    }

    async showRelatedPostsByTag(relatedPostTag, shouldShowRelatedPosts) {
        if (this.selectedRelatedPostTag == null || this.selectedRelatedPostTag != relatedPostTag) {
            // if selected related tag is null, user hasn't clicked one yet; if this, or if
            // they're clicking on a new tag, load new tags
            this.relatedPosts = await this.postApi.getRelatedPostsByTag(relatedPostTag);
            this.relatedPosts = this.relatedPosts.filter(post => post.blogpost_id != this.blogpostId);
            this.showRelatedPosts = true;
        } else if (shouldShowRelatedPosts == true && this.selectedRelatedPostTag == relatedPostTag) {    
            // if we want to show related posts, and the new tag is the same as the old, we will
            // have already loaded the related posts, so just show them
            if (this.relatedPosts && this.relatedPosts.length > 0) {
                this.showRelatedPosts = true;
            }
        } else {
            // only collapse the section if its the same tag as before, and we were showing relatedPosts
            this.showRelatedPosts = false;
        }

        if (this.relatedPosts.length == 0) {
            this.noRelatedPosts = true;
        } else {
            this.noRelatedPosts = false;
        }

        this.selectedRelatedPostTag = relatedPostTag;
    }

    async scrollToTopBeforeNewPostIsLoaded() {
        document.querySelector('.top-bar')?.scrollIntoView({ 
            behavior: 'smooth' , block: 'start'
        });
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}