import {noView, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@noView
@inject(EventAggregator)
export class Dimmer {
    constructor(EventAggregator) {
        this.eventAggregator = EventAggregator;

        this.eventAggregator.subscribe('dim-content', response => {
            const content = document.getElementById("content");
            if (content != null || content != undefined) {
                content.style.opacity = 0.3;
            }
        });

        this.eventAggregator.subscribe('undim-content', response => {
            const content = document.getElementById("content");
            if (content != null || content != undefined) {
                content.style.opacity = 1.0;
            }
        });
    }
}