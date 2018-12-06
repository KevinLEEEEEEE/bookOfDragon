// @ts-check

const FADE_PER_STEP = 10;

class ShadeCanvas extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color', 'brushSize', 'width', 'height'];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        ${this.styleText}
      </style>

      <div class="canvasContainer">
        <canvas width='${this.width}' height='${this.height}'>
          please update your brosewr!
        </canvas>
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .canvasContainer {
        position: relative;
      } 
      
      canvas {
        position: absolute;
        background-color: lightgray;
      }
    `;
  }

  width = 0;

  height = 0;

  styleNode;

  canvasNode;

  context;

  fadeCountDown = 0;

  canDraw = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
  }

  connectedCallback() {
    console.log('Custom square element added to page.');

    this.addEvents();
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');

    this.removeEvents();
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom square element attributes changed.');

    switch (name) {
      case 'color':
        this.updateColor(newValue);
        break;
      case 'brushSize':
        this.updateBrushSize(newValue);
        break;
      case 'width':
        this.resizeWidth(newValue);
        break;
      case 'height':
        this.resizeHeight(newValue);
        break;
      default:
    }
  }

  updateColor(value) {

  }

  updateBrushSize(value) {

  }

  resizeWidth(value) {
    const width = parseInt(value);

    if (!isNaN(width) && width >= 0) {
      this.width = width;

      this.resizeCanvas();
    }
  }

  resizeHeight(value) {
    const height = parseInt(value);

    if (!isNaN(height) && height >= 0) {
      this.height = height;

      this.resizeCanvas();
    }
  }

  resizeCanvas() {
    window.requestAnimationFrame(() => {
      this.canvasNode.width = this.width + 'px';
      this.canvasNode.height = this.height;

      this.canvasNode.setAttribute('width', this.width);
      this.canvasNode.setAttribute('height', this.height);
    });
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelector('style');

    this.canvasNode = ele.querySelector('canvas');

    this.context = this.canvasNode.getContext('2d');
  }

  addEvents() {
    this.canvasNode.addEventListener('mousedown', this.mousedown, false);

    this.canvasNode.addEventListener('mousemove', this.mousemove, false);

    this.canvasNode.addEventListener('mouseup', this.mouseup, false);

    this.canvasNode.addEventListener('mouseleave', this.mouseleave, false);
  }

  removeEvents() {
    this.canvasNode.removeEventListener('mousedown', this.mousedown, false);

    this.canvasNode.removeEventListener('mousemove', this.mousemove, false);

    this.canvasNode.removeEventListener('mouseup', this.mouseup, false);

    this.canvasNode.removeEventListener('mouseleave', this.mouseleave, false);
  }

  mousedown = () => {
    this.canDraw = true;
  }

  mousemove = (e) => {
    const { layerX, layerY } = e;

    this.colorFade();

    this.paint(layerX, layerY);
  }

  mouseup = () => {
    this.canDraw = false;
  }

  mouseleave = () => {
    this.canDraw = false;
  }

  colorFade() {
    this.fadeCountDown += 1;

    if (this.fadeCountDown % FADE_PER_STEP === 0) {
      this.dispatchFadeEvent();
    }
  }

  dispatchFadeEvent() {
    const fadeEvent = new CustomEvent('fade', {
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(fadeEvent);
  }

  paint(x, y) {

  }
}

customElements.define('shade-canvas', ShadeCanvas);