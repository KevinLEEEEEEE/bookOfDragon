// @ts-check

const MAX_PHASE = 4;
const MIN_PHASE = 0;

class Moon extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['phase', 'color'];
  }

  color = 'red';

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
  }

  disconnectedCallback() {
    // console.log('Custom square element removed from page.');
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom square element attributes changed.');

    switch (name) {
      case 'phase':
        this.updatePhase(newValue);
        break;
      case 'color':
        this.updateColor(newValue);
        break;
      default:
    }
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelectorAll('style')[1];

    this.imageNode = ele.querySelector('img');
  }

  updatePhase(value) {
    const phase = parseInt(value);

    if (this.isValidPhase(phase) === true) {
      this.imageNode.setAttribute('src', `./src/image/moon_animation/moon_${phase}.png`);
    }
  }

  isValidPhase(value) {
    return !isNaN(value) && value <= MAX_PHASE && value >= MIN_PHASE;
  }

  updateColor(value) {
    this.color = value;

    this.updateStyle();
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        .moonContainer {
          width: 300px;
          height: 300px;
          font-size: 0;
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='moonContainer'>
        <img src="./src/image/moon_animation/moon_0.png" alt="moon">
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .moonContainer {
        background-color: ${this.color};
      }
    `;
  }
}

customElements.define('simple-moon', Moon);