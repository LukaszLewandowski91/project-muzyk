import { classNames, select, settings } from './settings.js';
import HomePage from './components/HomePage.js';
const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.navs.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.navs.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);

        thisApp.data.songs = parsedResponse;

        console.log(thisApp.data.songs);

        /* tutaj dodac wywolanie HOME */
        for (let songData in thisApp.data.songs) {
          new HomePage(
            thisApp.data.songs[songData].id,
            thisApp.data.songs[songData]
          );
        }
      });
  },
  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    thisApp.initPages();
    thisApp.initData();
  },
};

app.init();
