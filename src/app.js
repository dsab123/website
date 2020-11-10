import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {Dimmer} from 'resources/utility/dimmer';

@inject(Dimmer)
export class App {
  constructor(Dimmer) {
    this.dimmer = Dimmer;
  }
   
  configureRouter(config, router) {
    config.map([
      {
        route: ['', 'home', 'summaries'], 
        name: 'Home',
        nav: true, 
        moduleId: PLATFORM.moduleName('resources/components/summaries'), 
        title: 'Daniel Sabbagh - Reading Is Essential'
      },
      {
        route: 'about',
        name: 'About Me',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/about'),
        title: 'About Me - Daniel Sabbagh'
      },
      {
        route: 'blogs',
        name: 'Blog',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/blogs'),
        title: 'Blog - Daniel Sabbagh'
      },
      {
        route: 'blog/:blogpostId?/:slug?',
        nav: false,
        moduleId: PLATFORM.moduleName('resources/components/blog'),
        href: '/blog'
      },
      {
        route: 'summary/:summaryId?/:slug?',
        nav: false,
        moduleId: PLATFORM.moduleName('resources/components/summary'),
        href: '/summary'
      },
      {
        route: 'talks',
        name: 'Talks',
        nav: false,
        moduleId: PLATFORM.moduleName('resources/components/talks'),
        title: 'Talks'
      },
      {
        route: 'summaries',
        name: 'Books',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/summaries'),
        title: 'Book Summaries - Daniel Sabbagh'
      }
    ]);

    // TODO
    // config.mapUnknownRoutes('view-model');

    config.options.pushState = true;
    this.router = router;
  }
}
