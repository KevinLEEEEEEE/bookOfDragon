// @ts-check

const MAX_PHASE = 100;
const MIN_PHASE = 0;
const radiusOfMoon = 150;
const xOfMoon = 150;
const yOfMoon = 150;
const canvasWidth = 300;
const canvasHeight = 300;

class Moon extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['phase', 'color'];
  }

  isMuskReversed = -1;

  prevPhase = 0;

  currPhase = 0;

  animationSequence = [];

  isAnimationRunning = false;

  styleNode;

  moonCvsNode;

  shaderMuskCvsNode;

  moonCtx;

  shaderMuskCtx;

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

    this.moonCvsNode = ele.querySelector('canvas');

    this.moonCtx = this.moonCvsNode.getContext('2d');

    this.moonCvsNode = ele.querySelectorAll('canvas')[0];

    this.shaderMuskCvsNode = ele.querySelectorAll('canvas')[1];

    this.moonCtx = this.moonCvsNode.getContext('2d');

    this.shaderMuskCtx = this.shaderMuskCvsNode.getContext('2d');

    this.shaderMuskCtx.fillStyle = 'black';
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
    const loopTime = Math.abs(this.prevPhase - this.currPhase);
    const step = (this.currPhase - this.prevPhase) / loopTime;

    for (let i = 0; i < loopTime; i += 1) {
      const currPhase = this.prevPhase + i * step;
      const x = this.calcMoonMuskXFromPhase(currPhase);
      const isReverse = this.calcMoonMuskReverseFromPhase(currPhase);

      this.animationSequence.push([isReverse, x]);
    }

    if (this.isAnimationRunning === false) {
      this.isAnimationRunning = true;

      this.activeAnimationLoop();
    }
  }

  calcMoonMuskXFromPhase(phase) {
    const normalizedPhase = phase <= 50 ? phase : 100 - phase;
    const diameterOfMoon = 2 * radiusOfMoon;

    return diameterOfMoon - (2 * diameterOfMoon / 100) * normalizedPhase;
  }

  calcMoonMuskReverseFromPhase(phase) {
    return phase <= 50 ? -1 : 1;
  }

  activeAnimationLoop() {
    if (this.animationSequence.length === 0) {
      this.isAnimationRunning = false;

      return;
    }

    const [isReverse, x] = this.animationSequence.shift();

    this.updateMuskReverseState(isReverse);

    this.draw(x);

    setTimeout(() => {
      this.activeAnimationLoop();
    }, 20);
  }

  updateMuskReverseState(isReverse) {
    if (isReverse !== this.isMuskReversed) {
      this.isMuskReversed = isReverse;

      this.updateStyle();
    }
  }

  draw(x) {
    const musk = this.getMoonMuskFromX(x);

    this.drawShaderMusk(x, musk);
  }

  drawMoon() {
    this.moonCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.moonCtx.beginPath();
    this.moonCtx.arc(xOfMoon, yOfMoon, radiusOfMoon, 0, 2 * Math.PI);
    // this.moonCtx.rect(0, 0, canvasWidth, canvasHeight);
    this.moonCtx.closePath();
    this.moonCtx.fill();
  }

  drawShaderMusk(x, { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle }) {
    this.shaderMuskCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.shaderMuskCtx.beginPath();
    this.shaderMuskCtx.arc(centerPointXOfMusk, yOfMoon, radiusOfMusk, startAngle, endAngle, x >= radiusOfMoon);
    this.shaderMuskCtx.arc(xOfMoon, yOfMoon, radiusOfMoon + 2, 1.5 * Math.PI, 0.5 * Math.PI, false);
    this.shaderMuskCtx.fill();
  }

  getMoonMuskFromX(x) {
    const centerPointXOfMusk = (xOfMoon ** 2 + radiusOfMoon ** 2 - x ** 2) / (2 * xOfMoon - 2 * x);
    const radiusOfMusk = Math.abs(centerPointXOfMusk - x);
    const halfRadianOfMusk = Math.asin(radiusOfMoon / radiusOfMusk);
    const startAngle = Math.PI - halfRadianOfMusk;
    const endAngle = Math.PI + halfRadianOfMusk;

    return { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle };
  }

  updateColor(value) {
    // const grd = this.moonCtx.createRadialGradient(xOfMoon, yOfMoon, radiusOfMoon - 80, xOfMoon, yOfMoon, radiusOfMoon);

    // grd.addColorStop(0.8, value);
    // grd.addColorStop(1, 'transparent');

    // this.moonCtx.fillStyle = grd;

    this.moonCtx.fillStyle = value;

    this.drawMoon();
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
          width: ${canvasWidth}px;
          height: ${canvasHeight}px;
        }

        .moonCanvas {
          z-index: -1;
        }

        .moonShaderMusk {
          z-index: 2;
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='moonContainer'>
        <canvas width="${canvasWidth}" height="${canvasHeight}" class="moonCanvas"></canvas>
        <img src="./src/image/moonShader.png" alt="moonShader">
        <canvas width="${canvasWidth}" height="${canvasHeight}" class="moonShaderMusk"></canvas>
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .moonCanvas {
        -moz-transform:scaleX(${-this.isMuskReversed});
        -webkit-transform:scaleX(${-this.isMuskReversed});
        -o-transform:scaleX(${-this.isMuskReversed});
        transform:scaleX(${-this.isMuskReversed});
      }

      .moonShaderMusk {
        -moz-transform:scaleX(${-this.isMuskReversed});
        -webkit-transform:scaleX(${-this.isMuskReversed});
        -o-transform:scaleX(${-this.isMuskReversed});
        transform:scaleX(${-this.isMuskReversed});
      }
    `;
  }
}

customElements.define('simple-moon', Moon);