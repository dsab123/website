export class BookSummary {
    constructor(data = {}) {
        this.summary_id = 0;
        this.title = '';
        this.author = '';
        this.quality = 0;
        this.payoff = 0;
        this.image_uri = '';
        this.link = '';
        this.teaser = '';
        this.slug = '';
        
        Object.assign(this, data);
    }
}