import {inject} from 'aurelia-framework';
import {PostApi} from '../api/postApi';
let showdown = require('showdown');

@inject(PostApi)
export class Blog {

    constructor(PostApi) {
        this.postApi = PostApi;

        // properties for main post
        this.postTitle = null;
        this.postContents = null;
        this.postTags = null;
        this.dimPostContents = false;
        this.isPostLoaded = false;
        this.blogpostId = 1;

        // properties for related posts by tag
        this.relatedPosts = [];
        this.filteredRelatedPosts = [];
        this.showRelatedPosts = false;
        this.noRelatedPosts = false;
        this.selectedRelatedPostTag = null;
    }

    async activate(urlParams, routeMap, navigationInstruction) {
        if (urlParams && urlParams.blogpostId) {
            this.blogpostId = urlParams.blogpostId;
            this.getPostContents(urlParams.blogpostId);
        } else {
            this.getPostContents();
        }

        if (urlParams && urlParams.slug) {
            await this.postApi.getBlogPostContents(urlParams.slug).then(data => {
                let converter = new showdown.Converter({
                    simpleLineBreaks: 'true'
                });
    
                this.postContents = converter.makeHtml(data);
            });
        }
    }

    attached() {
        this.setPostContentsContainer();
    }

    async getPostContents(postId) {
        // dim postContents to indicate new post incoming
        this.dimPostContents = true;

        if (!postId) {
            postId = this.getDefaultPostId();
        }
    
        this.postApi.retrieveBlogPost(postId).then((data) => {
            this.postTitle = data.title;
            this.postTags = data.tags;

            // undim post contents
            this.dimPostContents = false;
            this.isPostLoaded = true;
        });
    }

    setPostContentsContainer() {
        if (this.postContentsContainer) {
            this.postContentsContainer.innerHTML = this.postContents;
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
            this.relatedPosts = this.relatedPosts.filter(post => post.id != this.blogpostId);
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

    resetScroll() {
        // empty div hook is fastest, but not cleanest; hope I've named it clearly enough!
        document.querySelector('#empty-div-hook-for-scrolling').scrollIntoView({ 
            behavior: 'smooth' 
          });
    }
}