export const select = {
  templateOf: {
    homePage: '#template-home-page',
    searchPage: '#template-search-page',
    discoverPage: '#template-discover-page',
    typeMusic: '#template-type',
  },
  containerOf: {
    navs: '.main-nav',
    pages: '#pages',
    homePage: '.home-wrapper',
    music: '.music',
    musicOnSearch: '.music-search',
    subscribe: '.container-subscribe',
    searchPage: '.search-wrapper',
    containerMusic: '.searching',
    containerHomeMusic: '.filterMusic',
    discoverPage: '.discover-wrapper',
    musicDiscover: '.music-discover',
  },
  nav: {
    links: '.main-nav a',
  },
  song: {
    categories: '.categories',
    type: '.typesOfMusic',
  },
  button: {
    search: '.buttonSearch',
    text: '.fragmentText',
    valueSong: '.founder-song',
    linkFilter: '.listMusic',
    allLinks: '.listMusic .linkType',
  },
  list: {
    typeOfMusic: '.listMusic',
  },
};

export const classNames = {
  navs: {
    active: 'active',
  },
  links: {
    active: 'activateFilter',
  },
  song: {
    disabled: 'disabled',
  },
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const templates = {
  homePage: Handlebars.compile(
    document.querySelector(select.templateOf.homePage).innerHTML
  ),
  searchPage: Handlebars.compile(
    document.querySelector(select.templateOf.searchPage).innerHTML
  ),
  discoverPage: Handlebars.compile(
    document.querySelector(select.templateOf.discoverPage).innerHTML
  ),
  typeMusic: Handlebars.compile(
    document.querySelector(select.templateOf.typeMusic).innerHTML
  ),
};
