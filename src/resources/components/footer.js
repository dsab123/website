import { EventAggregator } from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class Footer {
    constructor(EventAggregator) {
        this.eventAggregator = EventAggregator;
    
        this.isContentLoaded = false;
        this.subscription = this.eventAggregator.subscribe('contentLoaded', response => {
            this.isContentLoaded = true;
        });
    }

    detached() {
        this.subscription.dispose();
    }
}