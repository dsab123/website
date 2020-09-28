import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Talk} from '../models/talk';

@inject(EventAggregator)
export class Talks {
    constructor(EventAggregator) {
        this.talksList = [];
        this.eventAggregator = EventAggregator;
    }

    activate(urlParams, routeMap, navigationInstruction) {
        // check for post id from router?
        this.talksList = this.getTalksList();
        this.blurb = "I'm finding that I'm not all that terrible at learning and teaching stuff. Over the last year or so I've gotten interested in giving tech talks on topics that interest me.";
        this.paragraph = "I've given talks on a wide variety of topics relating to Unit Testing - on the frontend using Karma, on the backend using NUnit/NSubstitute, and on refactoring code to make unit testing easier.";
    }

    attached() {
        this.eventAggregator.publish('content-loaded');
    }

    // will want to retrieve these more intelligently at some point in the future, obvi
    getTalksList() {
        return [
            new Talk({
                id: 1,
                title: "Front-End Unit Testing",
                description: "This presentation will discuss benefits of writing unit tests, broadly explain the basic concepts involved, give examples of front-end tests, and provide an optional interactive portion using a project’s full build pipeline.",
                slides: "coming soon",
                recording: "coming soon",
                date: "2018-02-09"
            }),
            new Talk({
                id: 2,
                title: "Back-End Unit Testing",
                description: "ain't no description here yet lols",
                slides: "coming soon",
                recording: "coming soon",
                date: "2017-05-08"
            })
        ];
    }
}