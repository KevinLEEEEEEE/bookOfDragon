// @ts-check

const DEFAULT_SCALE_RATIO = 0.3;
const MAX_SCALE_RATIO = 1;

class Palette extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color'];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
      </style>

      <div class="palette">
        <img src="./src/image/paletteCore.png" alt="palette core" class="paletteCore">
        <img src="./src/image/paletteBorder.jpg" alt="palette border">
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .paletteContainer {
        position: relative;
      }
      
      .paletteCore {
        position: absolute;
        left: 31%;
        top: 50%;
        background-color: ${this.color};
        transform: scale(${this.scale});
      }
    `;
  }

  palette;

  styleNode;

  scale = DEFAULT_SCALE_RATIO;

  color = 'gray';

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();

    this.updateStyle();
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');

    this.updateColor(newValue);
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.palette = ele.querySelector('img');

    this.styleNode = ele.querySelector('style');

    console.log(this.styleNode);
  }

  updateColor(color) {
    this.color = color;

    this.updateStyle();
  }

  updateScaleRatio(ratio) {
    this.scale = ratio;

    this.updateStyle();
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }
}

customElements.define('simple-palette', Palette);