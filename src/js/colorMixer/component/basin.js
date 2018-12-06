// @ts-check

const DEFAULT_DENSE_VALUE = 0.1;

class Basin extends HTMLElement {
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

      <div class="basin">
        basin
      </div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .basin {
        width: 100px;
        height: 100px;
        background-color: orange;
      }
    `;
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = this.template;

    this.initNodes();
  }

  basinNode;

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

    this.basinNode = ele.querySelector('.basin');
  }

  addEvents() {
    this.basinNode.addEventListener('click', this.click, false);
  }

  removeEvents() {
    this.basinNode.removeEventListener('click', this.click, false);
  }

  click = () => {
    // animation

    this.dispatchBasinEvent();
  }

  dispatchBasinEvent() {
    const basinEvent = new CustomEvent('basin', {
      detail: {
        value: DEFAULT_DENSE_VALUE,
      },
      bubbles: true,
      cancelable: true,
      composed: true, // cross the shadow dom
    });

    this.shadowRoot.dispatchEvent(basinEvent);
  }
}

customElements.define('simple-basin', Basin);