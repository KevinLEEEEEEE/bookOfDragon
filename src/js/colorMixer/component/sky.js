// @ts-check

class Sky extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['move', 'speedX', 'speedY', 'width', 'height', 'amount'];
  }

  /**
   * @type {HTMLStyleElement}
   */
  styleNode;

  /**
   * @type {HTMLDivElement}
   */
  skyContainer;

  /**
   * @type {HTMLCanvasElement}
   */
  skyCvs;

  /**
   * @type {CanvasRenderingContext2D}
   */
  skyCtx;

  width = 0;

  height = 0;

  amount = 0;

  speedX = 2;

  speedY = 1;

  skyMoveHandler = null;

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
      case 'move':
        this.changeMoveState(newValue);
        break;
      case 'speedX':
        this.changeSpeedX(newValue);
        break;
      case 'speedY':
        this.changeSpeedY(newValue);
        break;
      case 'width':
        this.changeWidth(newValue);
        break;
      case 'height':
        this.changeHeight(newValue);
        break;
      case 'amount':
        this.changeAmount(newValue);
        break;
      default:
    }
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelectorAll('style')[1];

    this.skyContainer = ele.querySelector('.skyContainer');

    this.skyCvs = ele.querySelector('.skyCanvas');

    this.skyCtx = this.skyCvs.getContext('2d');
  }

  attachEvents() {
    const ele = this.shadowRoot;
  }

  removeEvents() {
    const ele = this.shadowRoot;
  }

  /**
   *
   * @param {string} value
   */
  changeMoveState(value) {
    if (value === 'true') {
      if (this.skyMoveHandler === null) {
        this.skyMove();
      }
    } else {
      if (this.skyMoveHandler !== null) {
        clearInterval(this.skyMoveHandler);

        this.skyMoveHandler = null;
      }
    }
  }

  /**
   * @param {string} value
   */
  changeSpeedX(value) {
    const speedX = parseInt(value);

    if (this.isValidSize(speedX) === true) {
      this.speedX = speedX;
    }
  }

  /**
   * @param {string} value
   */
  changeSpeedY(value) {
    const speedY = parseInt(value);

    if (this.isValidSize(speedY) === true) {
      this.speedY = speedY;
    }
  }

  /**
   * @param {string} value
   */
  changeWidth(value) {
    const width = parseInt(value);

    if (this.isValidSize(width) === true) {
      this.width = width;

      this.skyCvs.width = width;

      this.initSky();
    }
  }

  /**
   * @param {string} value
   */
  changeHeight(value) {
    const height = parseInt(value);

    if (this.isValidSize(height) === true) {
      this.height = height;

      this.skyCvs.height = height;

      this.initSky();
    }
  }

  /**
   * @param {string} value
   */
  changeAmount(value) {
    const amount = parseInt(value);

    if (this.isValidSize(amount) === true) {
      this.amount = amount;

      this.initSky();
    }
  }

  isValidSize(value) {
    return !isNaN(value);
  }

  initSky() {
    const { width, height, amount } = this;

    if (width === 0 || height === 0 || amount === 0) {
      return;
    }

    const imageData = this.skyCtx.getImageData(0, 0, width, height);

    for (let i = 0; i < amount; i += 1) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      this.drawStar(imageData, Math.round(x), Math.round(y));
    }

    this.skyCtx.putImageData(imageData, 0, 0);
  }

  skyMove = (imageData = this.skyCtx.getImageData(0, 0, this.width, this.height)) => {
    requestAnimationFrame(() => {
      this.skyCtx.putImageData(imageData, 4, 2);
    });

    const newImageData = this.addStars(4, 2);

    this.skyMoveHandler = setTimeout(() => {
      this.skyMove(newImageData);
    }, 20);
  }

  addStars(xStep = 0, yStep = 0) {
    const { width, height } = this;
    const imageData = this.skyCtx.getImageData(0, 0, width, height);
    const ratio = xStep / (xStep + yStep);

    if (Math.random() > ratio) {
      const x = Math.random() * width;
      const y = Math.random() * yStep;

      this.drawStar(imageData, Math.round(x), Math.round(y));
    } else {
      const x = Math.random() * xStep;
      const y = Math.random() * height;

      this.drawStar(imageData, Math.round(x), Math.round(y));
    }

    return imageData;
  }

  /**
   * @param {ImageData} imageData
   * @param {number} x
   * @param {number} y
   */
  drawStar(imageData, x, y) {
    const { width, data } = imageData;
    const index = Math.floor(y * width + x) * 4;

    data[index] = 255;
    data[index + 1] = 255;
    data[index + 2] = 255;
    data[index + 3] = Math.random() * 510;
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }

  // @ts-ignore
  get template() {
    return `
      <style>
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='skyContainer'>
        <canvas class="skyCanvas"></canvas>
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
    `;
  }
}

customElements.define('simple-sky', Sky);