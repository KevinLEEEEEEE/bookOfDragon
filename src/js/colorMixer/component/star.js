// @ts-check

const MAX_LUMINANCE = 2;
const Min_LUMINANCE = 0;

class Star extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['luminance'];
  }

  luminance = 2;

  twinkleDir = -1;

  imageNode;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
  }

  connectedCallback() {
    // console.log('Custom square element added to page.');

    this.addEvents();
  }

  disconnectedCallback() {
    // console.log('Custom square element removed from page.');

    this.removeEvents();
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom square element attributes changed.');

    switch (name) {
      case 'luminance':
        this.updateLuminance(newValue);
        break;
      default:
    }
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.imageNode = ele.querySelector('img');
  }

  addEvents() {
    this.imageNode.addEventListener('click', this.twinkle, false);
  }

  removeEvents() {
    this.imageNode.removeEventListener('click', this.twinkle, false);
  }

  twinkle = () => {
    this.luminance = this.luminance + this.twinkleDir;

    this.dispatchTwinkleEvent();

    this.updateTwinkleDir();

    this.updateImage();
  }

  updateTwinkleDir() {
    if (this.luminance === 0) {
      this.twinkleDir = 1;
    } else if (this.luminance === 2) {
      this.twinkleDir = -1; ;
    }
  }

  dispatchTwinkleEvent() {
    const twinkleEvent = new CustomEvent('twinkle', {
      detail: {
        value: this.twinkleDir,
      },
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(twinkleEvent);
  }

  updateLuminance(value) {
    const luminance = parseInt(value);

    if (this.isValidLuminance(luminance) === true) {
      this.luminance = luminance;

      this.dispatchTwinkleEvent();

      this.updateTwinkleDir();

      this.updateImage();
    }
  }

  isValidLuminance(value) {
    return !isNaN(value) && value <= MAX_LUMINANCE && value >= Min_LUMINANCE;
  }

  updateImage() {
    this.imageNode.setAttribute('src', `./src/image/star_animation/star_${this.luminance}.png`);
  }


  // @ts-ignore
  get template() {
    return `
      <style>
        .moonContainer {
          font-size: 0;
        }

        .moonContainer::after {
          content: '';
          position: absolute;
          left:0px;
          right: 0px;        
          bottom: 143px;
          width: 1px;
          height: 100vh;
          margin: auto;
          background-color: rgba(255, 255, 255, 0.45);
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='moonContainer'>
        <img src="./src/image/star_animation/star_2.png" alt="star">
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
    `;
  }
}

customElements.define('simple-star', Star);