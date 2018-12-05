// @ts-check

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
          left: 66px;
          bottom: 0;
          display: flex;
        }
        
        .usedPigment simple-pigment{
          transform: scale(.5);
        }
        
        .usedPigment simple-pigment:not(:first-child){
          margin-left: -6%;
        }
      </style>

      <div class='pigment'>
        <simple-pigment color='red' surplus='5' class='currentPigment'></simple-pigment>
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

    this.addUsedPigment();
  }

  connectedCallback() {
    console.log('Custom square element added to page.');

    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');

    this.removeEvents();
  }

  // adoptedCallback() {
  //   console.log('Custom square element moved to new page.');
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
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
}

customElements.define('pigment-container', PigmentContainer);