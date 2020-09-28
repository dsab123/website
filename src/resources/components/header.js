import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
export class Header {

    constructor(Router, EventAggregator) {
        this.router = Router;
        this.eventAggregator = EventAggregator;

        // for the silly little value converter for nav items
        this.convertNavItems = false;
        this.convertMenuItemsTexts = ["click here, yo!", "click again to undo"];
        this.convertMenuItemsCounter = 0;
        this.convertMenuItemsText = this.convertMenuItemsTexts[this.convertMenuItemsCounter];

        // hamburger
        this.hamburgerOpen = false;
    }

    flipConverterText() {
        this.convertNavItems = !this.convertNavItems;
        this.convertMenuItemsText = this.convertMenuItemsTexts[++this.convertMenuItemsCounter % 2];
    }

    toggleHamburgerAndNavigate(nav) {
        this.toggleHamburger();
        this.navigate(nav);
    }

    toggleHamburger() {
        this.hamburgerOpen = !this.hamburgerOpen;
    }

    navigate(nav) {
        const currentModuleId = this.router.currentInstruction.config.moduleId.split("/").slice(-1)[0];
        const newModuleId = nav.config.moduleId.split("/").slice(-1)[0];
        
        // we want to prevent dimming in/out if the source and destination route correspond to the same module
        if (currentModuleId !== newModuleId) {
            this.eventAggregator.publish('dim-content');
        }

        this.router.navigate(nav.href);
    }
}