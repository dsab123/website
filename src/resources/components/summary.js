import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostApi} from '../api/postApi';
import {BookSummary} from '../models/bookSummary';

let showdown = require('showdown');

@inject(PostApi, BookSummary, EventAggregator, Router)
export class Summary {
    constructor(PostApi, BookSummary, EventAggregator, Router) {
        this.postApi = PostApi;
        this.bookSummary = BookSummary;
        this.eventAggregator = EventAggregator;
        this.router = Router;
    }

    attached() {
        // nothing to do here?
        let converter = new showdown.Converter({
            simpleLineBreaks: 'true'
        });

        let contents = converter.makeHtml(this.contents);

        if (this.summaryContents) {
            this.summaryContents.innerHTML = contents;
        }
    }

    populateSummaryInfo(source) {
        this.summary_id = source.summary_id;
        this.title = source.title;
        this.author = source.author;
        this.quality = source.quality;
        this.payoff = source.payoff;
        this.image_uri = source.image_uri;
        this.link = source.link;
        this.teaser = source.teaser;
        this.slug = source.slug;
    }

    async activate(urlParams) {
        if (urlParams && urlParams.summaryId) {
            // if we're going from summaries page, we have the 
            // singleton bookSummary to pull info from; else,
            // we'll need to hit API
            if (this.bookSummary.summary_id > 0) {
                this.populateSummaryInfo(this.bookSummary);
            } else {
                await this.postApi.getBookSummaryInfo(urlParams.summaryId).then(data => {
                    this.populateSummaryInfo(data);
                });
            }
            
            this.router.title = `${this.title} - Daniel Sabbagh`;
            this.contents = await this.postApi.getBookSummaryContents(this.slug);

            this.eventAggregator.publish('contentLoaded');
        }
    }
}