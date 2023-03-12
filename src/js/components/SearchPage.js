import { select, templates } from '../settings.js';
import utils from '../utils.js';

class SearchPage {
  constructor(id, data) {
    const thisSearch = this;

    (thisSearch.id = id), (thisSearch.data = data);

    thisSearch.renderSearch();
  }
  renderSearch() {
    const thisSearch = this;

    const generateHTML = templates.searchPage(thisSearch.data);

    thisSearch.element = utils.createDOMFromHTML(generateHTML);
    const menuContainer = document.querySelector(select.containerOf.searchPage);

    menuContainer.appendChild(thisSearch.element);
  }
}

export default SearchPage;
