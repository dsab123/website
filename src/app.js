import {PLATFORM} from 'aurelia-pal';

export class App {
  constructor() {
  }
   
  configureRouter(config, router) {
    config.title = 'Daniel Sabbagh';

    config.map([
      {
        route: ['', 'home', 'summaries'], 
        name: 'home',
        nav: true, 
        moduleId: PLATFORM.moduleName('resources/components/summaries'), 
        title: 'Home'
      },
      {
        route: 'about',
        name: 'about',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/about'),
        title: 'About'
      },
      {
        route: 'blogs',
        name: 'blog',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/blogs'),
        title: 'Blog'
      },
      {
        route: 'blog/:postId?/:slug?',
        name: 'blog',
        nav: false,
        moduleId: PLATFORM.moduleName('resources/components/blog'),
        title: 'Blog',
        href: '/blog'
      },
      {
        route: 'summary/:summaryId?/:slug?',
        name: 'summary',
        nav: false,
        moduleId: PLATFORM.moduleName('resources/components/summary'),
        title: 'Book Summary',
        href: '/summary'
      },
      {
        route: 'talks',
        name: 'talks',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/talks'),
        title: 'Talks'      
      },
      {
        route: 'summaries',
        name: 'summaries',
        nav: true,
        moduleId: PLATFORM.moduleName('resources/components/summaries'),
        title: 'Books'
      }
    ]);
    this.router = router;
  }
}
