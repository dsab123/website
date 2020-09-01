import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PostApi} from '../api/postApi';
import {BookSummary} from '../models/bookSummary';

@inject(PostApi, BookSummary, Router)
export class Summaries {
    constructor(PostApi, BookSummary, Router) {
        this.postApi = PostApi;
        this.bookSummary = BookSummary;
        this.router = Router;

        this.intro = "I like to read pretty widely, from tech to theology to bestsellers. Below you'll find a review for each of the books I've read, along with a link to buy. Drop me a line if you purchase any of these!";
        this.disclaimer = "I'm a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.";
        this.moneyPlea = "If you have found this content helpful, please consider supporting my work through paypal by clicking on the coffee cup at the bottom of this page."
        this.summaries = [];
        this.flag = false;        
    }

    activate() {
      // this.spinLoadingText(), when I get to this

      this.getBookSummaryLookup();
    }

    async getBookSummaryLookup() {
      await this.postApi.getBookSummaryLookup().then((data) => {
        this.summaries = data;
      });
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