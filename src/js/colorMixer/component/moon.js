// @ts-check

const MAX_PHASE = 100;
const MIN_PHASE = 0;
const radiusOfMoon = 150;

class Moon extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['phase', 'color'];
  }

  mirrorScale = 1;

  prevPhase = 0;

  currPhase = 0;

  animationSequence = [];

  isAnimationRunning = false;

  styleNode;

  canvasNode;

  context;

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

    this.canvasNode = ele.querySelector('canvas');

    this.context = this.canvasNode.getContext('2d');
  }

  updatePhase(value) {
    const phase = parseFloat(value);

    if (this.isValidPhase(phase) === true) {
      this.prevPhase = this.currPhase;

      this.currPhase = phase;

      this.moonAnimation();
    }
  }

  isValidPhase(value) {
    return !isNaN(value) && value <= MAX_PHASE && value >= MIN_PHASE;
  }

  moonAnimation() {
    const step = this.prevPhase > this.currPhase ? -1 : 1;
    // const animationArray = [];

    console.log('move phase from: ' + this.prevPhase + ' to: ' + this.currPhase);

    for (let i = 0; i < Math.abs(this.prevPhase - this.currPhase); i += 1) {
      const p = this.prevPhase + i * step;
      const realPhase = p <= 50 ? p : 100 - p;
      const x = 300 - 6 * realPhase;
      const mirror = p <= 50 ? 1 : -1;

      // animationArray.push([mirror, x]);

      this.animationSequence.push([mirror, x]);
    }

    if (this.isAnimationRunning === false) {
      this.isAnimationRunning = true;

      this.activeAnimationLoop();
    }
  }

  activeAnimationLoop() {
    if (this.animationSequence.length === 0) {
      this.isAnimationRunning = false;

      return;
    }

    const [mirror, x] = this.animationSequence.shift();

    if (mirror !== this.mirrorScale) {
      this.mirrorScale = mirror;

      this.updateStyle();
    }

    this.drawMoon(x, radiusOfMoon);

    setTimeout(() => {
      this.activeAnimationLoop();
    }, 20);
  }

  getCircleFromX(x, radius) {
    const centerPointXOfMusk = (2 * radius ** 2 - x ** 2) / (2 * radius - 2 * x);
    const radiusOfMusk = Math.abs(centerPointXOfMusk - x);
    const halfRadianOfMusk = Math.asin(radius / radiusOfMusk);
    const startAngle = Math.PI - halfRadianOfMusk;
    const endAngle = Math.PI + halfRadianOfMusk;

    return { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle };
  }

  drawMoon(x, radius) {
    const { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle } = this.getCircleFromX(x, radius);

    this.context.clearRect(0, 0, 2 * radius, 2 * radius);
    this.context.beginPath();
    this.context.arc(centerPointXOfMusk, radius, radiusOfMusk, startAngle, endAngle, x >= radius);
    this.context.arc(radius, radius, radius, 1.5 * Math.PI, 0.5 * Math.PI, true);
    this.context.fill();
  }

  updateColor(value) {
    this.color = value;

    this.context.fillStyle = this.color;
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        .moonContainer {
          position: relative;
          font-size: 0;
        }

        .moonContainer canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: ${2 * radiusOfMoon}px;
          height: ${2 * radiusOfMoon}px;
          z-index: -1;
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='moonContainer'>
        <canvas width="${2 * radiusOfMoon}" height="${2 * radiusOfMoon}"></canvas>
        <img src="./src/image/moonMusk.png" alt="moonMusk">
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .moonContainer canvas {
        -moz-transform:scaleX(${this.mirrorScale});
        -webkit-transform:scaleX(${this.mirrorScale});
        -o-transform:scaleX(${this.mirrorScale});
        transform:scaleX(${this.mirrorScale});
      }
    `;
  }
}

customElements.define('simple-moon', Moon);