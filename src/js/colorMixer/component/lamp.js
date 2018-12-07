// @ts-check

class Lamp extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return [];
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        ${this.styleText}
      </style>

      <div class="lamp">
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .lamp {
        width: 100px;
        height: 100px;
        background-color: gray;
      }
    `;
  }

  lampNode;

  level = 3;

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
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.lampNode = ele.querySelector('.lamp');
  }

  addEvents() {
    this.lampNode.addEventListener('click', this.click, false);
  }

  removeEvents() {
    this.lampNode.removeEventListener('click', this.click, false);
  }

  click = () => {
    // animation

    this.dispatchLampEvent();
  }

  dispatchLampEvent() {
    const lampEvent = new CustomEvent('lamp', {
      detail: {
        level: this.level,
      },
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(lampEvent);
  }
}

customElements.define('simple-lamp', Lamp);