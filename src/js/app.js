import { classNames, select, settings } from './settings.js';
import HomePage from './components/HomePage.js';
import AudioPlayer from './components/AudioPlayer.js';
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
    thisApp.specifyData = {};
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);

        thisApp.data.songs = parsedResponse;

        for (let songId in thisApp.data.songs) {
          const song = thisApp.data.songs[songId];

          let authorName = thisApp.data.songs[songId].filename.replaceAll(
            '_',
            ' '
          );

          authorName = authorName.toUpperCase();
          authorName = authorName.replace(
            thisApp.data.songs[songId].title.toUpperCase(),
            ''
          );

          authorName = authorName.replace('-', '');
          authorName = authorName.trim();

          authorName = authorName.replace('.MP3', '');
          authorName = authorName.toLowerCase();
          authorName = authorName.split(' ');

          for (let i = 0; i < authorName.length; i++) {
            authorName[i] =
              authorName[i].charAt(0).toUpperCase() + authorName[i].slice(1);
          }

          thisApp.specifyData[songId] = {
            id: song.id,
            title: song.title,
            author: authorName.join(' '),
            filename: song.filename,
            categories: song.categories.join(', '),
            ranking: song.ranking,
          };
        }

        for (let songData in thisApp.specifyData) {
          new HomePage(
            thisApp.specifyData[songData].id,
            thisApp.specifyData[songData]
          );
        }

        new AudioPlayer(select.containerOf.music);
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
