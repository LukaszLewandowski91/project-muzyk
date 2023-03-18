import { classNames, select, settings, templates } from './settings.js';
import HomePage from './components/HomePage.js';
import AudioPlayer from './components/AudioPlayer.js';
import Song from './components/Song.js';
import SearchPage from './components/SearchPage.js';
import DiscoverPage from './components/DiscoverPage.js';
const app = {
  filterHome: function () {
    const thisApp = this;

    thisApp.filterLinks = document.querySelector(select.button.linkFilter);
    thisApp.filterLinks.allLinks = thisApp.filterLinks.querySelectorAll(
      select.button.allLinks
    );
    thisApp.allSongs = document.querySelectorAll(
      select.containerOf.containerHomeMusic
    );

    console.log(thisApp.allSongs);

    thisApp.filterLinks.addEventListener('click', function (event) {
      event.preventDefault();

      const clicedLink = event.target;
      const filterType = clicedLink.getAttribute('href').replace('#', '');

      for (let link of thisApp.filterLinks.allLinks) {
        if (link === clicedLink) {
          clicedLink.classList.toggle(classNames.links.active);
          if (clicedLink.classList.contains(classNames.links.active)) {
            for (let song of thisApp.allSongs) {
              const categoriesMusic = song.querySelector(
                select.song.type
              ).innerHTML;
              if (!categoriesMusic.includes(filterType)) {
                song.classList.add(classNames.song.disabled);
              } else {
                song.classList.remove(classNames.song.disabled);
              }
            }
          } else {
            for (let song of thisApp.allSongs) {
              song.classList.remove(classNames.song.disabled);
            }
          }
        } else {
          link.classList.remove(classNames.links.active);
        }
      }
    });
  },
  initDiscover: function () {
    const thisApp = this;

    thisApp.discoverMusic = select.containerOf.musicDiscover;

    const objectLength = thisApp.data.songs.length;

    const randomSong = Math.floor(Math.random() * objectLength);

    const song = thisApp.data.songs[randomSong];

    const authorName = new Song(song);

    new DiscoverPage(authorName.specifyData.id, authorName.specifyData);

    new AudioPlayer(select.containerOf.musicDiscover);
  },
  initSearch: function () {
    const thisApp = this;

    thisApp.buttonSearch = document.querySelector(select.button.search);
    thisApp.inputText = document.querySelector(select.button.text);
    thisApp.valueSong = document.querySelector(select.button.valueSong);

    thisApp.buttonSearch.addEventListener('click', function (event) {
      event.preventDefault();
      thisApp.containerSong = document.querySelectorAll(
        select.containerOf.containerMusic
      );
      if (
        typeof thisApp.containerSong != 'undefined' &&
        thisApp.containerSong != null
      ) {
        console.log(thisApp.containerSong.length);
        for (var i = 0; i < thisApp.containerSong.length; i++) {
          thisApp.containerSong[i].parentNode.removeChild(
            thisApp.containerSong[i]
          );
          thisApp.valueSong.innerHTML = '';
        }
      }

      const fragmentSearch = thisApp.inputText.value.toLowerCase();

      if (fragmentSearch == '') {
        alert('Wprowadź wartość do wyszukania');
      } else {
        let valueSong = 0;

        for (let songId in thisApp.data.songs) {
          const song = thisApp.data.songs[songId];

          const authorName = new Song(song);

          if (
            authorName.specifyData.fullName
              .toLowerCase()
              .includes(fragmentSearch)
          ) {
            new SearchPage(authorName.specifyData.id, authorName.specifyData);
            valueSong++;
          }
        }

        if (valueSong == 0) {
          thisApp.valueSong.innerHTML = 'We don\'t have any song :(';
        } else if (valueSong == 1) {
          thisApp.valueSong.innerHTML = 'We have found 1 song...';
        } else {
          thisApp.valueSong.innerHTML =
            'We have found ' + valueSong + ' songs...';
        }

        new AudioPlayer(select.containerOf.musicOnSearch);
      }
    });
  },
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
    thisApp.typeOfMusic = {};
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

          for (let type of song.categories) {
            if (!thisApp.typeOfMusic[type]) {
              thisApp.typeOfMusic[type] = 0;
            }
          }

          const authorName = new Song(song);

          thisApp.specifyData[songId] = authorName.specifyData;
        }

        console.log(thisApp.typeOfMusic);

        for (let songData in thisApp.specifyData) {
          new HomePage(
            thisApp.specifyData[songData].id,
            thisApp.specifyData[songData]
          );
        }
        thisApp.initDiscover();
        new AudioPlayer(select.containerOf.music);

        const typeList = document.querySelector(select.list.typeOfMusic);

        thisApp.allTypeData = { types: [] };

        for (let type in thisApp.typeOfMusic) {
          thisApp.allTypeData.types.push({
            type: type,
            count: thisApp.typeOfMusic[type],
          });
        }

        typeList.innerHTML = templates.typeMusic(thisApp.allTypeData);
        thisApp.filterHome();
      });
  },
  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    thisApp.initPages();
    thisApp.initData();
    thisApp.initSearch();
  },
};

app.init();
