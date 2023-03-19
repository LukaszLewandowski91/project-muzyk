import { select, templates } from '../settings.js';
import utils from '../utils.js';

class DiscoverPage {
  constructor(id, data) {
    const thisDiscover = this;

    thisDiscover.id = id;
    thisDiscover.data = data;

    thisDiscover.renderDiscover();
  }
  renderDiscover() {
    const thisDiscover = this;

    const generateHTML = templates.discoverPage(thisDiscover.data);
    thisDiscover.element = utils.createDOMFromHTML(generateHTML);

    const menuContainer = document.querySelector(
      select.containerOf.discoverPage
    );

    menuContainer.appendChild(thisDiscover.element);
  }
}

export default DiscoverPage;
