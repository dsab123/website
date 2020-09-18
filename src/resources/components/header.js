import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Header {

    constructor(Router) {
        this.router = Router;
        this.title = "Daniel Sabbagh";

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

    toggleHamburger() {
        this.hamburgerOpen = !this.hamburgerOpen;
    }

    toggleHamburgerAndNavigate(href) {
        this.toggleHamburger();
        this.router.navigate(href);
    }
}