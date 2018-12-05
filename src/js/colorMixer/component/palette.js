// @ts-check

const DEFAULT_SCALE_RATIO = 0.3;
const MAX_SCALE_RATIO = 1;

class Palette extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color', 'scale'];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        ${this.styleText}
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
      .palette {
        position: relative;
        overflow: hidden;
      }
      
      .paletteCore {
        position: absolute;
        left: 25%;
        top: 35%;
        background-color: ${this.color};
        transform: scale(${this.scale});
      }
    `;
  }

  styleNode;

  scale = DEFAULT_SCALE_RATIO;

  color = 'gray';

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
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

    switch (name) {
      case 'color':
        this.updateColor(newValue);
        break;
      case 'scale':
        this.updateScaleRatio(newValue);
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

    this.updateStyle();
  }

  updateScaleRatio(value) {
    const ratio = parseFloat(value);

    if (!isNaN(ratio) && ratio <= MAX_SCALE_RATIO && ratio >= DEFAULT_SCALE_RATIO) {
      this.scale = ratio;

      this.updateStyle();
    }
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }
}

customElements.define('simple-palette', Palette);