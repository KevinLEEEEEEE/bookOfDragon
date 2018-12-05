// @ts-check

const MAX_USE_TIME = 5;

class Pigment extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color', 'surplus'];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        img {
          background-color: gray;
        }
      </style>

      <img src="./src/image/pigment0.png" alt="pigment">
    `;
  }

  surplus = 0;

  styleNode;

  imageNode;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
  }

  connectedCallback() {
    console.log('Custom square element added to page.');

    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');

    this.removeEvents();
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');

    switch (name) {
      case 'color':
        this.updateColor(newValue);
        break;
      case 'surplus':
        this.updateSurplus(newValue);
        break;
      default:
    }
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelector('style');

    this.imageNode = ele.querySelector('img');
  }

  attachEvents() {
    const ele = this.shadowRoot;

    ele.addEventListener('click', this.click, false);
  }

  removeEvents() {
    const ele = this.shadowRoot;

    ele.removeEventListener('click', this.click, false);
  }

  click = () => {
    this.surplus -= 1;

    this.squeezePigment();
  }

  squeezePigment = () => {
    switch (this.surplus) {
      case 5:
      case 4:
      case 3:
      case 2:
      case 1:
        this.squeezeAnimation();
        break;
      case 0:
        this.squeezeAnimation();

        this.dispatchUseupEvent();
        break;
      default:
    }
  }

  squeezeAnimation() {
    this.imageNode.setAttribute('src', `./src/image/pigment${this.surplus}.png`);
  }

  dispatchUseupEvent() {
    const useupEvent = new CustomEvent('useup', {
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(useupEvent);
  }

  updateColor(color) {
    this.styleNode.textContent = `
      img {
        background-color: ${color};
      }
    `;

    this.imageNode.setAttribute('alt', `${color} pigment`);
  }

  updateSurplus(value) {
    const surplus = parseInt(value);

    if (!isNaN(surplus) && surplus >= 0 && surplus <= MAX_USE_TIME) {
      this.surplus = surplus;

      this.squeezePigment();
    }
  }
}

customElements.define('simple-pigment', Pigment);