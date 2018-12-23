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

  moonCtx;

  shaderMuskCtx;

  moonDividesCtx;

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

    const cvs = ele.querySelectorAll('canvas');

    this.moonCtx = cvs[0].getContext('2d');

    this.shaderMuskCtx = cvs[1].getContext('2d');

    this.moonDividesCtx = cvs[2].getContext('2d');
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

      this.activeAnimationLoop(25);
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

  activeAnimationLoop(delay) {
    if (this.animationSequence.length === 0) {
      this.isAnimationRunning = false;

      return;
    }

    const [isReverse, x] = this.animationSequence.shift();

    this.updateMuskReverseState(isReverse);

    this.draw(x);

    setTimeout(() => {
      this.activeAnimationLoop(delay);
    }, delay);
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

    this.drawShaderDivides(x, musk);
  }

  getMoonMuskFromX(x) {
    const centerPointXOfMusk = (xOfMoon ** 2 + radiusOfMoon ** 2 - x ** 2) / (2 * xOfMoon - 2 * x);
    const radiusOfMusk = Math.abs(centerPointXOfMusk - x);
    const halfRadianOfMusk = Math.asin(radiusOfMoon / radiusOfMusk);
    const startAngle = Math.PI - halfRadianOfMusk;
    const endAngle = Math.PI + halfRadianOfMusk;

    return { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle };
  }

  drawShaderMusk(x, { centerPointXOfMusk, radiusOfMusk, startAngle, endAngle }) {
    this.shaderMuskCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.shaderMuskCtx.beginPath();
    this.shaderMuskCtx.arc(centerPointXOfMusk, yOfMoon, radiusOfMusk, startAngle, endAngle, x >= xOfMoon);
    this.shaderMuskCtx.arc(xOfMoon, yOfMoon, radiusOfMoon + 2, 1.5 * Math.PI, 0.5 * Math.PI, false);
    this.shaderMuskCtx.fill();
  }

  drawShaderDivides(x, { centerPointXOfMusk, radiusOfMusk }) {
    if (!isFinite(radiusOfMusk)) {
      return;
    }

    let grd = null;
    const arg = x <= xOfMoon ? 1 : -1;

    if (x < 150) {
      grd = this.moonDividesCtx.createRadialGradient(centerPointXOfMusk, yOfMoon, radiusOfMusk, centerPointXOfMusk, yOfMoon, radiusOfMusk + 25);

      grd.addColorStop(0, 'black');
      grd.addColorStop(1, 'transparent');
    } else {
      grd = this.moonDividesCtx.createRadialGradient(centerPointXOfMusk, yOfMoon, radiusOfMusk - 25, centerPointXOfMusk, yOfMoon, radiusOfMusk);

      grd.addColorStop(0, 'transparent');
      grd.addColorStop(1, 'black');
    }

    this.moonDividesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.moonDividesCtx.fillStyle = grd;
    this.moonDividesCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    this.moonDividesCtx.clearRect(xOfMoon, 0, xOfMoon + radiusOfMoon * arg, canvasHeight);
  }

  drawMoon() {
    this.moonCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.moonCtx.beginPath();
    this.moonCtx.arc(xOfMoon, yOfMoon, radiusOfMoon, 0, 2 * Math.PI);
    this.moonCtx.closePath();
    this.moonCtx.fill();
  }

  updateColor(value) {
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

        .moonContainer img {
          opacity: 0.85;
        }

        .moonCanvas {
          z-index: -1;
        }

        .moonShaderMusk {
          z-index: 2;
        }

        .moonDivides {
          z-index: 3;
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class='moonContainer'>
        <canvas width="${canvasWidth}" height="${canvasHeight}" class="moonCanvas"></canvas>
        <img src="./src/image/moonShader3.png" alt="moonShader">
        <canvas width="${canvasWidth}" height="${canvasHeight}" class="moonShaderMusk"></canvas>
        <canvas width="${canvasWidth}" height="${canvasHeight}" class="moonDivides"></canvas>
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

      .moonDivides {
        -moz-transform:scaleX(${-this.isMuskReversed});
        -webkit-transform:scaleX(${-this.isMuskReversed});
        -o-transform:scaleX(${-this.isMuskReversed});
        transform:scaleX(${-this.isMuskReversed});
      }
    `;
  }
}

customElements.define('simple-moon', Moon);