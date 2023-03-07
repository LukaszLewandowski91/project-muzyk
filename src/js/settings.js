export const select = {
  templateOf: {
    homePage: '#template-home-page',
  },
  containerOf: {
    navs: '.main-nav',
    pages: '#pages',
    homePage: '.home-wrapper',
    music: '.music',
  },
  nav: {
    links: '.main-nav a',
  },
  song: {
    categories: '.categories',
  },
};

export const classNames = {
  navs: {
    active: 'active',
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
};
