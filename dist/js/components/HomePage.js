import { select, templates } from '../settings.js';
import utils from '../utils.js';

class HomePage {
  constructor(id, data) {
    const thisHome = this;

    thisHome.id = id;
    thisHome.data = data;

    thisHome.renderHome();
  }
  renderHome() {
    const thisHome = this;

    const generateHTML = templates.homePage(thisHome.data);

    thisHome.element = utils.createDOMFromHTML(generateHTML);
    const menuContainer = document.querySelector(select.containerOf.homePage);

    menuContainer.appendChild(thisHome.element);
  }
}

export default HomePage;
