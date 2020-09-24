import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {BookSummary} from '../models/bookSummary';
import {PostApi} from '../api/postApi';

@inject(PostApi, BookSummary, Router, EventAggregator)
export class Summaries {
    constructor(PostApi, BookSummary, Router, EventAggregator) {
        this.postApi = PostApi;
        this.bookSummary = BookSummary;
        this.router = Router;
        this.eventAggregator = EventAggregator;

        this.intro = "I like to read pretty widely, from tech to theology to bestsellers. Below you'll find a review for each of the books I've read, along with a link to buy. Drop me a line if you purchase any of these!";
        this.disclaimer = "I'm a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.";
        this.summaries = [];
        this.flag = false;

        // have to do this because aurelia automatically prepends the title from app.js to the residual
        // title from the last page :facepalm:
        this.router.title = '';
    }

    activate() {
      // this.spinLoadingText(), when I get to this

      this.getBookSummaryLookup();
    }

    async getBookSummaryLookup() {
      await this.postApi.getBookSummaryLookup().then((data) => {
        this.summaries = data;
      });

      this.eventAggregator.publish('contentLoaded');
    }

    populateBookSummary(summaryId) {
      let summary = this.summaries.find(summary => summary.summary_id == summaryId);

      this.bookSummary.summary_id = summary.summary_id;
      this.bookSummary.title = summary.title;
      this.bookSummary.author = summary.author;
      this.bookSummary.quality = summary.quality;
      this.bookSummary.payoff = summary.payoff;
      this.bookSummary.image_uri = summary.image_uri;
      this.bookSummary.link = summary.link;
      this.bookSummary.teaser = summary.teaser;
      this.bookSummary.slug = summary.slug;
     
      this.router.navigate(`summary/${summary.summary_id}/${summary.slug}`);
    }
}