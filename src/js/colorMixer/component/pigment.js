// @ts-check

const MAX_USE_TIME = 5;
const DEFAULT_SQUEEZE_QUANTITY = 10;

class Pigment extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color', 'surplus'];
  }

  color = 'gray';

  surplus = MAX_USE_TIME;

  styleNode;

  imageNode;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
  }

  connectedCallback() {
    // console.log('Custom square element added to page.');

    this.attachEvents();
  }

  disconnectedCallback() {
    // console.log('Custom square element removed from page.');

    this.removeEvents();
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom square element attributes changed.' + newValue);

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

    this.styleNode = ele.querySelectorAll('style')[1];

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
        this.updateStyle();
      case 4:
        this.updateStyle();
      case 3:
      case 2:
      case 1:
        this.squeezeAnimation();

        this.dispatchSqueezeEvent();
        break;
      case 0:
        this.dispatchSqueezeEvent();

        this.dispatchUseupEvent();
        break;
      default:
    }
  }

  squeezeAnimation() {
    this.imageNode.setAttribute('src', `./src/image/pigment/pigment${this.surplus}.png`);
  }

  dispatchSqueezeEvent() {
    const squeezeEvent = new CustomEvent('squeeze', {
      detail: {
        color: this.color,
        quantity: DEFAULT_SQUEEZE_QUANTITY,
      },
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(squeezeEvent);
  }

  dispatchUseupEvent() {
    const useupEvent = new CustomEvent('useup', {
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(useupEvent);
  }

  updateColor(value) {
    this.color = value;

    this.imageNode.setAttribute('alt', `${this.color} pigment`);

    this.updateStyle();
  }

  updateSurplus(value) {
    const surplus = parseInt(value);

    if (!isNaN(surplus) && surplus >= 0 && surplus <= MAX_USE_TIME) {
      this.surplus = surplus;

      this.squeezePigment();
    }
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        .pigmentContainer {
          font-size: 0;
          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;
        }

        .pigmentColorLayer {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='pigmentContainer'>
        <img src="./src/image/pigment/pigment5.png" alt="pigment">
        <div class="pigmentColorLayer"></div>
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .pigmentColorLayer {
        background: ${this.color};
        mask-image: url('/src/image/pigment/pigment_mask_${this.surplus === MAX_USE_TIME ? 'full' : 'using'}.png');
      }
    `;
  }
}

customElements.define('simple-pigment', Pigment);