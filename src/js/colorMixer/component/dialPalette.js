// @ts-check

import ColorConverter from '../color/colorConverter';

const MAX_ROTATION = 360;
const MIN_ROTATION = 0;

class DialPalette extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color'];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        ${this.styleText}
      </style>

      <div class="dial">
        <img src="./src/image/dial.png" alt="dial">
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .dial {
        font-size: 0;
        overflow: hideen;
        border-radius: 100%;
        background-color: ${this.color};
        transform: rotate(${this.rotation}deg);
        -ms-transform: rotate(${this.rotation}deg);
        -webkit-transform: rotate(${this.rotation}deg);
        -o-transform: rotate(${this.rotation}deg);
        -moz-transform: rotate(${this.rotation}deg);
      }
    `;
  }

  styleNode;

  rotation = 0;

  color = 'gray';

  colorConverter;

  constructor() {
    super();

    this.colorConverter = new ColorConverter();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
  }

  // connectedCallback() {
  //   console.log('Custom square element added to page.');
  // }

  // disconnectedCallback() {
  //   console.log('Custom square element removed from page.');
  // }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom square element attributes changed.');

    switch (name) {
      case 'color':
        this.updateColor(newValue);
        break;
      default:
    }
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelector('style');
  }

  updateColor(color) {
    this.color = color;

    this.updateRotation();

    this.updateStyle();
  }

  updateRotation() {
    const regexp = /(rgb[(])(\d{1,3})(, )(\d{1,3})(, )(\d{1,3})([)])/;

    try {
      const [, , r, , g, , b] = regexp.exec(this.color);

      const { h } = this.colorConverter.rgbToHsv(parseInt(r), parseInt(g), parseInt(b));

      this.rotation = h;
    } catch (err) {

    }
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }
}

customElements.define('dial-palette', DialPalette);