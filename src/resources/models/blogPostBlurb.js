export class BlogPostBlurb {
    constructor(data = {}) {
        this.id = 0;
        this.title = '';
        this.teaser = '';
        
        Object.assign(this, data);
    }
}