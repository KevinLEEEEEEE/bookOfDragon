// @ts-check

const state = {
  default: 'none',
  stand: 'stand',
  walk: 'walk'
};

class Prince extends HTMLElement {
  // @ts-ignore
  static get observedAttributes() {
    return ['state'];
  }

  styleNode;

  state = state.default;

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
      case 'state':
        this.setState(newValue);
        break;
      default:
    }
  }

  setState(value) {
    switch (value) {
      case 'stand':
        this.state = state.stand;
        break;
      case 'walk':
        this.state = state.walk;
        break;
      default:
        this.state = state.default;
        break;
    }

    this.updateStyle();
  }

  initNodes() {
    const ele = this.shadowRoot;

    this.styleNode = ele.querySelectorAll('style')[1];
  }

  updateStyle() {
    this.styleNode.textContent = this.styleText;
  }

  // @ts-ignore
  get template() {
    return `
      <style>
        .prince {
          width: 420px;
          height: 580px;
        }

        @keyframes prince_stand_animation
        {
          0% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_1.png');
          }

          25% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_2.png');
          }

          50% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_3.png');
          }

          75% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_4.png');
          }

          100% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_5.png');
          }
        }

        @-moz-keyframes prince_stand_animation
        {
          0% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_1.png');
          }

          25% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_2.png');
          }

          50% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_3.png');
          }

          75% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_4.png');
          }

          100% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_5.png');
          }
        }

        @-webkit-keyframes prince_stand_animation
        {
          0% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_1.png');
          }

          25% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_2.png');
          }

          50% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_3.png');
          }

          75% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_4.png');
          }

          100% {
            background-image: url('./src/image/prince_stand_animation/prince_stand_5.png');
          }
        }

        @keyframes prince_walk_animation
        {
          0% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_1.png');
          }

          25% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_2.png');
          }

          50% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_3.png');
          }

          75% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_4.png');
          }

          100% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_5.png');
          }
        }

        @-moz-keyframes prince_walk_animation
        {
          0% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_1.png');
          }

          25% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_2.png');
          }

          50% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_3.png');
          }

          75% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_4.png');
          }

          100% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_5.png');
          }
        }

        @-webkit-keyframes prince_walk_animation
        {
          0% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_1.png');
          }

          25% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_2.png');
          }

          50% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_3.png');
          }

          75% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_4.png');
          }

          100% {
            background-image: url('./src/image/prince_walk_animation/prince_walk_5.png');
          }
        }
      </style>

      <style>
        ${this.styleText}
      </style>

      <div class="prince"></div>
    `;
  }

  // @ts-ignore
  get styleText() {
    return `
      .prince {
        animation: prince_${this.state}_animation 0.5s infinite;
      }
    `;
  }
}

customElements.define('simple-prince', Prince);