
export class BlogPost {
    constructor(data = {}) {
        this.id = 0; 
        this.content = '';
        this.slug = '';
        this.title = '';
        this.tags = '';
        this.relatedPosts = {};
        Object.assign(this, data);
    }

    static createErrorBlogPost() {
        let blogPost = new BlogPost();
        blogPost.id = -1;
        blogPost.content = 'Looks like there was an error somewhere. \n\nShhh.\n\nDon\'t tell anyone.';
        blogPost.title = 'Whoops, something happened';
        blogPost.tags = ['error handling'];
        
        return blogPost;
    }
}