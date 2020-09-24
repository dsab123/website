import {PLATFORM} from 'aurelia-pal';

export class App {
  constructor() {
  }
   
  configureRouter(config, router) {
    //config.title = 'Daniel Sabbagh';

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
    
    this.router = router;
  }
}
