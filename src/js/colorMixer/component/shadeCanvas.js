// @ts-check

const DENSE_PER_STEP = 3;

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
    `;
  }

  width = 0;

  height = 0;

  styleNode;

  canvasNode;

  context;

  fadeCountDown = 0;

  canDraw = false;

  preMousePosition;

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
    this.context.fillStyle = value;
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

  mousedown = (e) => {
    const { layerX, layerY } = e;

    this.preMousePosition = [layerX, layerY];

    this.canDraw = true;
  }

  mousemove = (e) => {
    const { layerX, layerY } = e;

    if (this.canDraw === true) {
      this.colorFade();

      this.paint(layerX, layerY);

      this.preMousePosition = [layerX, layerY];
    }
  }

  mouseup = () => {
    this.mouseleave();
  }

  mouseleave = () => {
    this.fadeCountDown = 0;

    this.canDraw = false;

    this.dispatchResetEvent();
  }

  colorFade() {
    this.fadeCountDown += 1;

    if (this.fadeCountDown % DENSE_PER_STEP === 0) {
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

  dispatchResetEvent() {
    const resetEvent = new CustomEvent('reset', {
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(resetEvent);
  }

  paint(x, y) {
    const xdelta = this.preMousePosition[0] - x;
    const func = this.getLineFunctionForX(x, y, this.preMousePosition[0], this.preMousePosition[1]);
    const start = Math.min(x, this.preMousePosition[0]);

    for (let x = 0; x <= Math.abs(xdelta); x += 1) {
      const x1 = start + x;
      const y1 = func(x1);

      this.paintCircle(x1, y1, 40);
    }
  }

  getLineFunctionForX(x1, y1, x2, y2) {
    const k = (y2 - y1) / (x2 - x1);

    return x => k * x + (y1 - k * x1);
  }

  paintCircle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x - 150, y - 50, radius, 0, 2 * Math.PI, false); // fix required
    this.context.fill();
    this.context.closePath();
  }
}

customElements.define('shade-canvas', ShadeCanvas);