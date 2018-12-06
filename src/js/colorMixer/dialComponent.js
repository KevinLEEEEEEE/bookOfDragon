// @ ts-check

import capital from './utils/capital';

export default class DialComponent {
  mixer;
  palette;
  component;

  constructor(mixer, node) {
    this.mixer = mixer;

    this.component = node;

    this.initNode(node);

    this.addEvents();

    this.mixer.register(this);

    this.update();
  }

  initNode(node) {
    this.palette = node.querySelector('dial-palette');
  }

  addEvents() {
    this.component.addEventListener('squeeze', this.addColor, false);

    this.component.addEventListener('useup', this.useup, false);
  }

  addColor = (e) => {
    let { color, quantity } = e.detail;

    e.stopPropagation();

    try {
      if (color === '#ff007f') {
        color = 'purplishRed';
      }

      this.mixer[`add${capital(color)}`](quantity);
    } catch (err) {
      console.log(err);
    }
  }

  useup = (e) => {
    e.stopPropagation();

    e.target.setAttribute('surplus', 5);
  }

  update() {
    this.updateColor();

    this.updateRotation();
  }

  updateColor() {
    const { r, g, b } = this.mixer.getRgb();

    this.palette.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
  }

  updateRotation() {
  }
}