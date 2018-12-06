// @ts-check

const DEFAULT_SURPLUS = 5;

class PigmentContainer extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['color'];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        .pigment {
          position: relative;
        }

        .usedPigment {
          position: absolute;
          top: -100px;
          right: 0;
          left: 0;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }
        
        .usedPigment simple-pigment{
        }
      </style>

      <div class='pigment'>
        <simple-pigment color='gray' surplus='${DEFAULT_SURPLUS}' class='currentPigment'></simple-pigment>
        <div class="usedPigment"></div>
      </div>
    `;
  }

  pigment;

  currentPigment;

  usedPigmentContainer;

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
    // console.log('Custom square element attributes changed.');

    this.updateColor(newValue);
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.pigment = ele.querySelector('.pigment');

    this.currentPigment = ele.querySelector('.currentPigment');

    this.usedPigmentContainer = ele.querySelector('.usedPigment');
  }

  attachEvents() {
    this.pigment.addEventListener('useup', this.useup, false);
  }

  removeEvents() {
    this.pigment.removeEventListener('useup', this.useup, false);
  }

  useup = () => {
    this.currentPigment.setAttribute('surplus', 5);

    this.addUsedPigment();
  }

  addUsedPigment() {
    const usedPigment = document.createElement('simple-pigment');

    this.usedPigmentContainer.appendChild(usedPigment);
  }

  updateColor(value) {
    this.currentPigment.setAttribute('color', value);
  }
}

customElements.define('pigment-container', PigmentContainer);