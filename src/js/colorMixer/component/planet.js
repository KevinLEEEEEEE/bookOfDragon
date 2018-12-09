// @ts-check

class Planet extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['planetangle', 'pointerangle', 'autorotation'];
  }

  styleNode;

  planetNode;

  planetAngle = 0;

  pointerAngle = 0;

  rotateDuration = 0;

  prevRotateDuration = this.rotateDuration;

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
      case 'planetangle':
        this.rotatePlanet(newValue);
        break;
      case 'pointerangle':
        this.rotatePointer(newValue);
        break;
      case 'autorotation':
        this.autoRotation(newValue);
        break;
      default:
    }
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelectorAll('style')[1];

    this.planetNode = ele.querySelector('.planet');
  }

  rotatePlanet(value) {
    const angle = parseInt(value);

    if (this.isValidAngle(angle)) {
      this.planetAngle = angle;

      this.updateStyle();
    }
  }

  rotatePointer(value) {
    const angle = parseInt(value);

    if (this.isValidAngle(angle)) {
      this.pointerAngle = angle;

      this.updateStyle();
    }
  }

  isValidAngle(angle) {
    return !isNaN(angle) && angle <= 360 && angle >= 0;
  }

  autoRotation(value) {
    const duration = parseFloat(value);

    if (this.isValidDuration(duration)) {
      this.rotateDuration = duration;

      if (duration !== 0) {
        this.prevRotateDuration = this.rotateDuration;
      }

      this.updateStyle();
    }
  }

  isValidDuration(duration) {
    return !isNaN(duration);
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        .planet {
          position: relative;
          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;
          animation: autororations infinite linear;
        }

        .pigmentsContainer {
          position: absolute;
          top: 600px;
          left: 650px;
        }

        .pointerContainer {
          position: absolute;
          left: calc(50% - 100px);
          top: calc(50% - 100px);
        }

        @keyframes autororations
        {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        @-moz-keyframes autororations
        {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        @-webkit-keyframes autororations
        {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class="planetWrapper">
        <div class="planet autororation">
          <img src="./src/image/planet.png" alt="planet">
          <div class="pointerContainer">
            <img src="./src/image/pointer.png" alt="pointer">
          </div>
          <div class="pigmentsContainer">
            <slot name="pigments"></slot>
          </div>
        </div>
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .planetWrapper {
        transform: rotate(${this.planetAngle}deg);
        -ms-transform: rotate(${this.planetAngle}deg);
        -webkit-transform: rotate(${this.planetAngle}deg);
        -o-transform: rotate(${this.planetAngle}deg);
        -moz-transform: rotate(${this.planetAngle}deg);
      }

      .pointerContainer {
        transform: rotate(${this.pointerAngle}deg);
        -ms-transform: rotate(${this.pointerAngle}deg);
        -webkit-transform: rotate(${this.pointerAngle}deg);
        -o-transform: rotate(${this.pointerAngle}deg);
        -moz-transform: rotate(${this.pointerAngle}deg);
      }

      .autororation {
        animation-duration: ${this.prevRotateDuration}s;
        animation-play-state: ${this.rotateDuration === 0 ? 'paused' : 'running'};
      }
    `;
  }
}

customElements.define('simple-planet', Planet);